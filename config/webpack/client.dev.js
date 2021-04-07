const path = require("path");

module.exports = {
  devtool: "inline-source-map",
  devServer: {
    // Display only errors to reduce the amount of output.
    stats: "errors-only",
    host: process.env.DEVSERVER_HOST,
    port: process.env.DEVSERVER_PORT,
    open: true, // Open the page in browser
    overlay: true,
  },
};
