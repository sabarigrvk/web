const pkg = require("../package.json");
module.exports = (api) => {
  console.log(api.env, api.webpackLoaderContext.target);
  return {
    // You can specify any options from https://postcss.org/api/#processoptions here
    plugins: [
      [
        "postcss-preset-env",
        {
          /* options */
          stage: 3,
          browsers: pkg.browserslist[api.env],
          autoprefixer: { flexbox: "no-2009" },
        },
      ],
    ],
  };
};
