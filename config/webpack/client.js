import { join } from "path";
import webpack from "webpack";
import TerserPlugin from "terser-webpack-plugin";
import paths from "../paths";
import { resolvers } from "./utils";
import { clientLoaders } from "./loaders";
import { sharedPlugins, clientPlugins } from "./plugins";
const { CLIENT_SRC_DIR, CLIENT_BUILD_DIR, PUBLIC_DIR } = paths;

const baseConfig = {
  name: "client",
  target: "web",
  entry: {
    bundle: [CLIENT_SRC_DIR],
  },
  output: {
    path: join(CLIENT_BUILD_DIR, PUBLIC_DIR),
    filename: "bundle.js",
    publicPath: PUBLIC_DIR,
    chunkFilename: "[name].[chunkhash:8].chunk.js",
  },
  resolve: {
    ...resolvers,
  },
  // loader config for server
  module: {
    rules: clientLoaders,
  },
  plugins: [...sharedPlugins, ...clientPlugins],
  node: {},
  optimization: {

  },
  stats: {
    cached: false,
    cachedAssets: false,
    chunks: false,
    chunkModules: false,
    children: false,
    colors: true,
    hash: false,
    modules: false,
    reasons: false,
    timings: true,
    version: false,
  },
};

export default {
  development: {
    ...baseConfig,
    devtool: "inline-cheap-module-source-map",
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      ...baseConfig.plugins,
    ],
  },
  production: {
    ...baseConfig,
    devtool: "source-map",
    output: {
      ...baseConfig.output,
      filename: "bundle.[contenthash:8].js",
    },
  },
};
