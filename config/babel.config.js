const pkg = require("../package.json");

module.exports = (api) => {
  // caches transformations in dev environment
  api.cache.using(() => process.env.NODE_ENV);
  return {
    presets: [
      // A Babel preset that can automatically determine the Babel plugins and polyfills
      // https://github.com/babel/babel-preset-env
      [
        "@babel/preset-env",
        {
          modules: false,
          useBuiltIns: "entry",
        },
      ],
      "@babel/preset-react",
    ],
    plugins: ["react-hot-loader/babel"],
    ignore: ["node_modules", "build"],
  };
};
