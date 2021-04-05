const { resolve } = require("path");

module.exports = {
  // Source files
  SRC_DIR: resolve(__dirname, "../src"),

  // Production build files
  BUILD_DIR: resolve(__dirname, "../dist"),

  // Static files that get copied to build folder
  PUBLIC_DIR: resolve(__dirname, "../public"),

  CONFIG_DIR: resolve(__dirname, "../config"),
};
