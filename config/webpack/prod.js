const path = require("path");
const { CleanPlugin } = require("./plugins");

module.exports = {
  mode: "production",
  devtool: "eval-source-map",
  plugins: [CleanPlugin],
};
