const path = require("path");
const { default: merge } = require("webpack-merge");
const { SRC_DIR, BUILD_DIR } = require("../paths");
const devConfig = require("./dev");
const { HTMLPlugin } = require("./plugins");
const prodConfig = require("./prod");
require("dotenv").config();
module.exports = (env, argv) => {
  // base configuration
  const baseConfig = {
    entry: {
      app: SRC_DIR + "/app.js",
      admin: SRC_DIR + "/dashboard.js",
    },
    output: {
      path: BUILD_DIR,
      publicPath: process.env.PUBLIC_PATH,
      filename: "[name].bundle.js",
    },
    plugins: [HTMLPlugin],
  };

  switch (argv.mode) {
    case "development":
      return merge(baseConfig, devConfig);
    case "production":
      return merge(baseConfig, prodConfig);
    default:
      throw new Error("No matching configuration found");
  }
};
