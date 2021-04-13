import webpack from "webpack";
import rimraf from "rimraf";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import nodemon from "nodemon";
import express from "express";
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

const app = express();

const WEBPACK_PORT =
  process.env.WEBPACK_PORT ||
  (!isNaN(Number(process.env.PORT)) ? Number(process.env.PORT) + 1 : 8501);

const DEVSERVER_HOST = process.env.DEVSERVER_HOST || "http://localhost";

const startServer = async () => {
  clientConfig.entry.bundle = [
    `webpack-hot-middleware/client?path=${DEVSERVER_HOST}:${WEBPACK_PORT}/__webpack_hmr`,
    ...clientConfig.entry.bundle,
  ];

  clientConfig.output.hotUpdateMainFilename = "updates/[hash].hot-update.json";
  clientConfig.output.hotUpdateChunkFilename =
    "updates/[id].[hash].hot-update.js";

  const publicPath = clientConfig.output.publicPath;
  clientConfig.output.publicPath = [
    `${DEVSERVER_HOST}:${WEBPACK_PORT}`,
    publicPath,
  ]
    .join("/")
    .replace(/([^:+])\/+/g, "$1/");

  serverConfig.output.publicPath = [
    `${DEVSERVER_HOST}:${WEBPACK_PORT}`,
    publicPath,
  ]
    .join("/")
    .replace(/([^:+])\/+/g, "$1/");

// console.log(clientConfig);
//     process.exit();

  const { compilers } = webpack([clientConfig, serverConfig]);

  const clientCompiler = compilers.find(
    (compiler) => compiler.name === "client"
  );
  const serverCompiler = compilers.find(
    (compiler) => compiler.name === "server"
  );

  const clientPromise = compilerPromise("client", clientCompiler);
  const serverPromise = compilerPromise("server", serverCompiler);

  const watchOptions = {
    ignored: /node_modules/,
    stats: clientConfig.stats,
  };

  app.use((_req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    return next();
  });

  app.use(
    webpackDevMiddleware(clientCompiler, {
      publicPath: clientConfig.output.publicPath,
      serverSideRender: true,
      // writeToDisk is used in favor of WriteFileWebpackPlugin
      // https://github.com/jacob-ebey/webpack-5-ssr-example/blob/e974509636ecd32a74fedb042a5a44033d21fc50/server/middleware/index.js#L40
      writeToDisk: true,
      stats: clientConfig.stats,
      watchOptions,
    })
  );

  app.use(webpackHotMiddleware(clientCompiler));

  app.use("/static", express.static(CLIENT_BUILD_DIR));

  app.listen(WEBPACK_PORT);

  serverCompiler.watch(watchOptions, (error, stats) => {
    console.log(chalk.red("servercompiler watching"));
    if (!error && !stats.hasErrors()) {
      console.log(stats.toString(serverConfig.stats));
      return;
    }

    if (error) {
      console.error(error);
    }

    if (stats.hasErrors()) {
      const info = stats.toJson();
      const errors = info.errors[0].details;
      console.error(errors);
    }
  });

  try {
    await serverPromise;
    await clientPromise;
  } catch (error) {
    console.error(error);
  }

  const script = nodemon({
    script: `${SERVER_BUILD_DIR}/server.js`,
    ignore: [
      "src",
      "scripts",
      "config",
      "./*.*",
      "build/client",
      "**/locales",
      "**/tmp",
    ],
    delay: 200,
  });

  script.on("restart", () => {
    console.warn(chalk.redBright("Server side app has been restarted."));
  });

  script.on("quit", () => {
    console.log(chalk.yellow("Process ended"));
    process.exit();
  });

  script.on("error", () => {
    console.error("An error occured. Exiting");
    process.exit(1);
  });
};

const startClient = async () => {};

if (clientOnly()) {
  startClient();
} else {
  startServer();
}
