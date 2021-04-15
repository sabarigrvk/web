import fs from "fs";
import { resolve, isAbsolute, delimiter } from "path";
import paths from "./paths";
delete require.cache[require.resolve('./paths')];

if (!process.env.NODE_ENV) {
  throw new Error(
    "The process.env.NODE_ENV environment variable is required but was not specified."
  );
}

// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
const envFiles = [
  `${paths.DOTENV}.${process.env.NODE_ENV}.local`,
  `${paths.DOTENV}.${process.env.NODE_ENV}`,
  process.env.NODE_ENV !== "test" && `${paths.DOTENV}.local`,
  paths.DOTENV,
].filter(Boolean);

envFiles.forEach((envFile) => {
  if (fs.existsSync(envFile)) {
    require("dotenv").config({
      path: envFile,
    });
  }
});

const rootDir = fs.realpathSync(process.cwd());
process.env.NODE_PATH = (process.env.NODE_PATH || "")
  .split(delimiter)
  .filter((folder) => folder && !isAbsolute(folder))
  .map((folder) => resolve(rootDir, folder))
  .join(delimiter);

export default () => {
  const raw = {
    PORT: process.env.PORT || 8500,
    NODE_ENV: process.env.NODE_ENV || "development",
    HOST: process.env.HOST || "http://localhost",
  };

  // Stringify all values so we can feed into Webpack DefinePlugin
  const stringified = {
    "process.env": Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };

  return { raw, stringified };
};
