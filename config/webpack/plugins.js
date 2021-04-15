import { join } from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { WebpackManifestPlugin } from "webpack-manifest-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import paths from "../paths";
import { clientOnly } from "../../scripts/utils";
import { isDev } from "./utils";
import envBuilder from "../env";

const env = envBuilder();
const { HTML_TEMPLATE, CLIENT_BUILD_DIR } = paths;

export const sharedPlugins = [
  new MiniCssExtractPlugin({
    filename: isDev() ? "[name].css" : "[name].[contenthash].css",
    chunkFilename: isDev() ? "[id].css" : "[id].[contenthash].css",
  }),
];

export const clientPlugins = [
  clientOnly() &&
    new HtmlWebpackPlugin({
      filename: join(CLIENT_BUILD_DIR, "index.html"),
      inject: true,
      template: HTML_TEMPLATE,
    }),
  new WebpackManifestPlugin({ fileName: "manifest.json" }),
  new webpack.DefinePlugin(env.stringified),
  new webpack.DefinePlugin({
    __SERVER__: "false",
    __BROWSER__: "true",
  }),
  new webpack.ProgressPlugin({ modulesCount: 10000 }),
].filter(Boolean);

export const serverPlugins = [
  new webpack.DefinePlugin({
    __SERVER__: "true",
    __BROWSER__: "false",
  }),
];

export default { sharedPlugins, clientPlugins, serverPlugins };
