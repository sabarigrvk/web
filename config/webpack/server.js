import nodeExternals from "webpack-node-externals";
import paths from "../paths";
import { resolvers } from "./utils";
import { serverLoaders } from "./loaders";
import { sharedPlugins, serverPlugins } from "./plugins";
const { SERVER_SRC_DIR, SERVER_BUILD_DIR, PUBLIC_DIR } = paths;
// https://github.com/manuelbieh/react-ssr-setup/blob/17a510d92ed2d550e1ead284a5aa9a7b30eae2d4/config/webpack.config.ts/client.base.ts
const baseConfig = {
  name: "server",
  target: "node",
  entry: {
    server: SERVER_SRC_DIR,
  },
  output: {
    path: SERVER_BUILD_DIR,
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
  node: {},
  externals: [
    nodeExternals({
      allowlist: /\.css$/,
    }),
  ],
  optimization: {},
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
    errorDetails: true,
  },
  node: {
    __dirname: false,
  },
};

export default {
  development: {
    ...baseConfig,
    performance: {
      hints: false,
    },
  },
  // https://github.com/manuelbieh/react-ssr-setup/blob/17a510d92ed2d550e1ead284a5aa9a7b30eae2d4/config/webpack.config.ts/client.prod.ts
  production: {
    ...baseConfig,
  },
};
