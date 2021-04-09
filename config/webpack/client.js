const { default: merge } = require("webpack-merge");
const { CleanPlugin } = require("./plugins");
const baseConfig = {
  name: "client",
  target: "web",
};

module.exports = {
  development: {
    ...baseConfig,
    devtool: "inline-source-map",
    devServer: {
      // Display only errors to reduce the amount of output.
      stats: "errors-only",
      open: true, // Open the page in browser
      overlay: true,
    },
  },
  production: {
    ...baseConfig,
    devtool: "eval-source-map",
    output: {
      filename: "bundle.[hash:8].js",
    },
    plugins: [CleanPlugin],
  },
};
