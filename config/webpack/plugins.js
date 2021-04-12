import { join } from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import paths from "../paths";
import { isDev } from "./utils";
const { HTML_TEMPLATE, CLIENT_BUILD_DIR } = paths;

export const sharedPlugins = [
  new MiniCssExtractPlugin({
    filename: isDev() ? "[name].css" : "[name].[contenthash].css",
    chunkFilename: isDev() ? "[id].css" : "[id].[contenthash].css",
  }),
];

export const clientPlugins = [
  new HtmlWebpackPlugin({
    filename: join(CLIENT_BUILD_DIR, "index.html"),
    inject: true,
    template: HTML_TEMPLATE,
  }),
  ,
  new webpack.DefinePlugin({
    __SERVER__: "false",
    __BROWSER__: "true",
  }),
].filter(Boolean);

export const serverPlugins = [
  new webpack.DefinePlugin({
    __SERVER__: "true",
    __BROWSER__: "false",
  }),
];

export default { sharedPlugins, clientPlugins, serverPlugins };
