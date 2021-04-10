import { join } from "path";
import { CLIENT_SRC, CLIENT_BUILD, PUBLIC } from "../paths";

// https://github.com/manuelbieh/react-ssr-setup/blob/17a510d92ed2d550e1ead284a5aa9a7b30eae2d4/config/webpack.config.ts/client.base.ts
const baseConfig = {
  name: "client",
  target: "web",
  entry: {
    bundle: CLIENT_SRC,
  },
  output: {
    path: join(CLIENT_BUILD, PUBLIC),
    filename: "bundle.js",
    publicPath: PUBLIC,
    chunkFilename: "[name].[chunkhash:8].chunk.js",
  },
  module: {
    rules: [
      // loader config for client
    ],
  },
  plugins: [],
  node: {
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty",
  },
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
