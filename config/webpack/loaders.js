const { SRC_DIR, CONFIG_DIR } = require("../paths");
const { isProd } = require("./helpers");
const JSLoader = {
  test: /\.js$/i,
  include: SRC_DIR,
  exclude: /node_modules/,
  use: {
    loader: require.resolve("babel-loader"),
    options: {
      babelrc: false,
      cacheDirectory: true,
      cacheCompression: isProd(),
      compact: isProd(),
      envName: process.env.NODE_ENV,
      ignore: ["node_modules", "build"],
      root: CONFIG_DIR,
    },
  },
};

module.exports = {
  JSLoader,
};
