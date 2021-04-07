const path = require("path");
const { default: merge } = require("webpack-merge");
const { SRC_DIR, BUILD_DIR } = require("../paths");
const { JSLoader } = require("./loaders");
const { HTMLPlugin } = require("./plugins");
const devConfig = require("./client.dev");
const prodConfig = require("./prod");
module.exports = (env, argv) => {
  // base configuration
  const baseConfig = {
    entry: {
      client: SRC_DIR + "/client.js",
      server: SRC_DIR + "/server.js",
    },
    output: {
      path: BUILD_DIR,
      publicPath: process.env.PUBLIC_PATH,
      filename: "[name].bundle.js",
    },
    module: {
      rules: [
        JSLoader,
      ],
    },
    plugins: [HTMLPlugin],
  };

  switch (process.env.NODE_ENV || argv.mode) {
    case "development":
      return merge(baseConfig, devConfig);
    case "production":
      return merge(baseConfig, prodConfig);
    default:
      throw new Error("No matching configuration found");
  }
};
