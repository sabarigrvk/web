module.exports = {
  presets: [
    [
      "@babel/env",
      {
        useBuiltIns: "entry",
        corejs: 3.6,
        targets: {
          node: "current",
        },
      },
    ],
    "@babel/react",
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-syntax-dynamic-import",
  ],
  ignore: ["node_modules", "build"],
};
