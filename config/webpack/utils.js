import path from "path";
import paths from "../paths";

const { resolveModules } = paths;

const isDev = () => process.env.NODE_ENV === "development";
const isProd = () => process.env.NODE_ENV === "production";

const resolvers = {
  extensions: [".js", ".json", ".jsx", ".ts", ".tsx", ".css"],
  modules: resolveModules,
  alias: {
    react: require.resolve("react"),
    "react-dom": require.resolve("react-dom"),
  },
};

module.exports = { isDev, isProd, resolvers };
