module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);
  const isTargetWeb = api.caller((caller) => caller && caller.target === "web");
  const isDev = ["test", "production"].includes(process.env.NODE_ENV) === false;

  return {
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
};
