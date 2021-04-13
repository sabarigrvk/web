import webpack from "webpack";
import rimraf from "rimraf";
import nodemon from "nodemon";
import fs from "fs";
import puppeteer from "puppeteer";
import chalk from "chalk";

import getConfig from "../config/webpack";
import paths from "../config/paths";
import { compilerPromise, clientOnly } from "./utils";

const { CLIENT_BUILD_DIR, SERVER_BUILD_DIR } = paths;
const [clientConfig, serverConfig] = getConfig(
  process.env.NODE_ENV || "development"
);
const HOST = process.env.HOST || "localhost";

// cleans the build directory
rimraf.sync(CLIENT_BUILD_DIR);
rimraf.sync(SERVER_BUILD_DIR);

const generateStaticHTML = async () => {
  // TODO: choose alternate port if already used
  const PORT = process.env.PORT || "3000";
  const script = nodemon({
    script: `${SERVER_BUILD_DIR}/server.js`,
    ignore: ["*"],
  });

  script.on("start", async () => {
    try {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      await page.goto(`${HOST}:${PORT}`, { waitUntil: "networkidle0" });
      const html = await page.content(); // serialized HTML of page DOM.
      fs.writeFileSync(`${CLIENT_BUILD_DIR}/index.html`, html);
      await browser.close();
    } catch (err) {
      script.emit("quit");
    } finally {
      script.emit("quit");
    }
  });

  script.on("exit", (code) => {
    process.exit(code);
  });

  script.on("crash", () => {
    process.exit(1);
  });
};

const buildServer = async () => {
  const { compilers } = webpack([clientConfig, serverConfig]);

  const clientCompiler = compilers.find(
    (compiler) => compiler.name === "client"
  );
  const serverCompiler = compilers.find(
    (compiler) => compiler.name === "server"
  );

  const clientPromise = compilerPromise("client", clientCompiler);
  const serverPromise = compilerPromise("server", serverCompiler);

  serverCompiler.watch({}, (error, stats) => {
    if (!error && !stats.hasErrors()) {
      console.log(stats.toString(serverConfig.stats));
      return;
    }
    console.error(stats.compilation.errors);
  });

  clientCompiler.watch({}, (error, stats) => {
    if (!error && !stats.hasErrors()) {
      console.log(stats.toString(clientConfig.stats));
      return;
    }
    console.error(stats.compilation.errors);
  });

  try {
    await serverPromise;
    await clientPromise;
    await generateStaticHTML();
    console.info("Done");
  } catch (error) {
    console.error("Error", error);
  }
};

const buildClient = async () => {
  const webpackCompiler = webpack([clientConfig]);

  const clientCompiler = webpackCompiler.compilers.find(
    (compiler) => compiler.name === "client"
  );
  const clientPromise = compilerPromise("client", clientCompiler);

  clientCompiler.watch({}, (error, stats) => {
    if (!error && !stats.hasErrors()) {
      console.log(stats.toString(clientConfig.stats));
      return;
    }
    console.error(stats.compilation.errors);
  });

  // wait until client and server is compiled
  try {
    await clientPromise;
    console.log(`Done building ${chalk.bold.cyanBright("client")}`);
    process.exit();
  } catch (error) {
    console.error(`Error building client: ${chalk.bold.redBright(error)}`);
  }
};

if (clientOnly()) {
  buildClient();
} else {
  buildServer();
}
