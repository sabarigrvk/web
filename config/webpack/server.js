const { default: merge } = require("webpack-merge");
const { CleanPlugin } = require("./plugins");
const { BUILD_DIR } = require("../paths");
const baseConfig = {
  name: "server",
  target: "node",
  output: {
    path: BUILD_DIR,
    filename: "server.js",
    publicPath: "/",
  },
  stats: {
    assets: false,
    cached: false,
    cachedAssets: false,
    chunks: false,
    chunkModules: false,
    children: false,
    colors: true,
    hash: false,
    modules: false,
    performance: false,
    reasons: false,
    timings: true,
    version: false,
  },
  node: {
    __dirname: false,
  },
};

module.exports = {
  development: merge(baseConfig, {
    devtool: "inline-source-map",
    devServer: {
      // Display only errors to reduce the amount of output.
      stats: "errors-only",
      host: process.env.DEVSERVER_HOST,
      port: process.env.DEVSERVER_PORT,
      open: true, // Open the page in browser
      overlay: true,
    },
    performance: {
      hints: false,
    },
  }),
  production: merge(baseConfig, {}),
};
