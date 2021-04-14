import { resolve } from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import paths from "../paths";
import { isDev, isProd } from "./utils";
const { SRC_DIR, CONFIG_DIR } = paths;

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const postcssOptions = {
  loader: require.resolve("postcss-loader"),
  options: {
    sourceMap: isDev(),
    postcssOptions: {
      // pass variables to the config file
      config: resolve(CONFIG_DIR, "postcss.config.js"),
    },
  },
};
const cssModuleOptions = {
  exportLocalsConvention: "camelCase",
  localIdentName: isDev()
    ? "[name]-[local]-[hash:base64:5]"
    : "[hash:base64:8]",
};

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

const cssLoaderClient = {
  test: cssRegex,
  exclude: cssModuleRegex,
  sideEffects: true,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: require.resolve("css-loader"),
      options: {
        importLoaders: 1,
      },
    },
    postcssOptions,
  ],
};

const cssLoaderServer = {
  test: cssRegex,
  exclude: cssModuleRegex,
  use: [MiniCssExtractPlugin.loader, require.resolve("css-loader")],
};

const cssModuleLoaderClient = {
  test: cssModuleRegex,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: require.resolve("css-loader"),
      options: {
        modules: cssModuleOptions,
        importLoaders: 1,
        sourceMap: isDev(),
      },
    },
    postcssOptions,
  ],
};

const cssModuleLoaderServer = {
  test: cssModuleRegex,
  use: [
    {
      loader: require.resolve("css-loader"),
      options: {
        modules: {
          ...cssModuleOptions,
          // useful for ssr: https://github.com/webpack-contrib/css-loader#exportonlylocals
          exportOnlyLocals: true,
        },
        importLoaders: 1,
        sourceMap: true,
      },
    },
    postcssOptions,
  ],
};

const assetLoaderClient = {
  test: /\.(png|jpe?g|gif|svg)$/,
  type: "asset",
  parser: {
    dataUrlCondition: {
      maxSize: 20 * 1024, // 20kb
    },
  },
};

const assetLoaderServer = {
  ...assetLoaderClient,
  // https://webpack.js.org/configuration/module/#rulegeneratoremit
  generator: {
    emit: false,
  },
};

export const clientLoaders = [
  {
    oneOf: [
      scriptsLoader,
      cssLoaderClient,
      cssModuleLoaderClient,
      assetLoaderClient,
    ],
  },
];

export const serverLoaders = [
  {
    oneOf: [
      scriptsLoader,
      cssLoaderServer,
      cssModuleLoaderServer,
      assetLoaderServer,
    ],
  },
];

export default {
  clientLoaders,
  serverLoaders,
};
