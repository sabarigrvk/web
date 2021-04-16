import { resolve } from "path";
import webpack from "webpack";
import nodeExternals from "webpack-node-externals";

import paths from "../paths";
import { resolvers } from "./utils";
import { serverLoaders } from "./loaders";
import { sharedPlugins, serverPlugins } from "./plugins";
const { SERVER_SRC_DIR, SERVER_BUILD_DIR, PUBLIC_DIR } = paths;
const baseConfig = {
  name: "server",
  target: "node",
  entry: {
    server: [
      require.resolve("core-js/stable"),
      require.resolve("regenerator-runtime/runtime"),
      resolve(SERVER_SRC_DIR, "index.js"),
    ],
  },
  output: {
    path: SERVER_BUILD_DIR,
    assetModuleFilename: "assets/[name].[hash:8].[ext]",
    filename: "server.js",
    publicPath: PUBLIC_DIR,
  },
  resolve: {
    ...resolvers,
  },
  // loader config for server
  module: {
    rules: serverLoaders,
  },
  plugins: [...sharedPlugins, ...serverPlugins],
  node: {
    __dirname: false,
  },
  externals: [
    nodeExternals({
      allowlist: /\.css$/,
    }),
  ],
  optimization: {},
  stats: {
    assets: false,
    cached: false,
    cachedAssets: false,
    chunks: false,
    chunkModules: false,
    children: false,
    colors: true,
    hash: false,
    modules: false,
    performance: false,
    reasons: false,
    timings: true,
    version: false,
  },
  node: {
    __dirname: false,
  },
};

export default {
  development: {
    ...baseConfig,
    plugins: [...baseConfig.plugins, new webpack.HotModuleReplacementPlugin()],
    performance: {
      hints: false,
    },
  },
  production: {
    ...baseConfig,
  },
};
