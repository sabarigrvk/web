const path = require("path");
const { CleanPlugin } = require("./plugins");

module.exports = {
  devtool: "eval-source-map",
  plugins: [CleanPlugin],
};
