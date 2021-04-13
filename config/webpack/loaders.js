import paths from "../paths";
import { isDev, isProd } from "./utils";
const { SRC_DIR, CONFIG_DIR } = paths;
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

export const clientLoaders = [
  {
    oneOf: [scriptsLoader],
  },
];

export const serverLoaders = [
  {
    oneOf: [scriptsLoader],
  },
];

export default {
  clientLoaders,
  serverLoaders,
};
