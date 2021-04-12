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

const app = express();
const startServer = async () => {};

const startClient = async () => {};

if (clientOnly()) {
  startClient();
} else {
  startServer();
}
