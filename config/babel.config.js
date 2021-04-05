const pkg = require("../package.json");

module.exports = (api) => {
  // console.log("\nenvironment", api.env("development"));
  api.cache(false);
  return {
    presets: [
      // A Babel preset that can automatically determine the Babel plugins and polyfills
      // https://github.com/babel/babel-preset-env
      [
        "@babel/preset-env",
        {
          modules: false,
          useBuiltIns: false,
        },
      ],
      "@babel/preset-react",
    ],
    plugins: ["react-hot-loader/babel", "@babel/plugin-syntax-dynamic-import"],
    ignore: ["node_modules", "build"],
  };
};
