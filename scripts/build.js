import webpack from "webpack";
import getConfig from '../config/webpack';

const webpackConfig = getConfig(process.env.NODE_ENV || "development");
console.log(webpackConfig);

function buildServer() {}
