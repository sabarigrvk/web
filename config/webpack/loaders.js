import { resolve } from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import paths from "../paths";
import { isDev, isProd } from "./utils";
const { SRC_DIR, CONFIG_DIR } = paths;

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;

const scriptsLoader = {
  test: /\.js$/i,
  include: SRC_DIR,
  exclude: /node_modules/,
  use: {
    loader: require.resolve("babel-loader"),
    options: {
      babelrc: false,
      cacheDirectory: isDev(),
      cacheCompression: isProd(),
      compact: isProd(),
      envName: process.env.NODE_ENV,
      ignore: ["node_modules", "build"],
      root: CONFIG_DIR,
    },
  },
};

const stylesLoader = {
  test: cssRegex,
  sideEffects: true,
  use: [
    MiniCssExtractPlugin.loader,
    require.resolve("css-loader"),
    {
      loader: require.resolve("postcss-loader"),
      options: {
        sourceMap: isDev(),
        postcssOptions: {
          // pass variables to the config file
          config: resolve(CONFIG_DIR, "postcss.config.js"),
        },
      },
    },
  ],
};

export const clientLoaders = [
  {
    oneOf: [scriptsLoader, stylesLoader],
  },
];

export const serverLoaders = [
  {
    oneOf: [scriptsLoader, stylesLoader],
  },
];

export default {
  clientLoaders,
  serverLoaders,
};
