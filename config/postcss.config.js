const pkg = require("../package.json");
module.exports = (api) => {
  console.log(api.env, api.webpackLoaderContext.target);
  return {
    // You can specify any options from https://postcss.org/api/#processoptions here
    plugins: [
      "postcss-import",
      [
        "postcss-preset-env",
        {
          /* options */
          stage: 2,
          browsers: pkg.browserslist[api.env],
          autoprefixer: { flexbox: "no-2009" },
          // https://github.com/csstools/postcss-preset-env/blob/master/src/lib/plugins-by-id.js#L36
          features: {
            "nesting-rules": true,
            "color-functional-notation": true,
          },
        },
      ],

      [
        "cssnano",
        {
          preset: [
            "default",
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      ],
    ],
  };
};
