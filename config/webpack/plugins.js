const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { PUBLIC_DIR, SRC_DIR, CONFIG_DIR } = require("../paths");
const { isDev, isProd } = require("./helpers");
const HTMLPlugin = new HtmlWebpackPlugin({
  title: "Hello Universe",
  inject: true,
  filename: "index.html", // output file
  template: PUBLIC_DIR + "/index.html", // template file
  ...(isProd && {
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    },
  }),
});

const CleanPlugin = new CleanWebpackPlugin({
  dry: false,
  verbose: true,
});

module.exports = {
  HTMLPlugin,
  CleanPlugin
};
