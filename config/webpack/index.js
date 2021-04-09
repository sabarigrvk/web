const path = require("path");
const { default: merge } = require("webpack-merge");
const { SRC_DIR, BUILD_DIR } = require("../paths");
const { JSLoader } = require("./loaders");
const { HTMLPlugin } = require("./plugins");
const clientConfig = require("./client");
const serverConfig = require("./server");
module.exports = (env, argv) => {
  const environment = process.env.NODE_ENV || argv.mode;
  // base configuration
  const baseConfig = {
    entry: {
      client: SRC_DIR + "/client/index.js",
      server: SRC_DIR + "/server/index.js",
    },
    output: {
      path: BUILD_DIR,
      publicPath: process.env.PUBLIC_PATH,
      filename: "[name].bundle.js",
    },
    module: {
      rules: [JSLoader],
    },
    plugins: [HTMLPlugin],
  };
  console.log(clientConfig);
  return [
    merge(baseConfig, clientConfig[environment]),
    merge(baseConfig, serverConfig[environment]),
  ];
};
