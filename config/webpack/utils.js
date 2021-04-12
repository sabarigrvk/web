import path from "path";
import paths from "../paths";

const { resolveModules } = paths;

const isDev = () => process.env.NODE_ENV === "development";
const isProd = () => process.env.NODE_ENV === "production";

const resolvers = {
  extensions: [".js", ".json", ".jsx", ".ts", ".tsx", ".css"],
  modules: resolveModules,
  alias: {},
};

module.exports = { isDev, isProd, resolvers };