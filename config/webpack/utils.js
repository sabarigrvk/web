import paths from "../paths";

const { resolveModules } = paths;

export const isDev = () => process.env.NODE_ENV === "development";
export const isProd = () => process.env.NODE_ENV === "production";

export const resolvers = {
  extensions: [".js", ".json", ".jsx", ".ts", ".tsx", ".css"],
  modules: resolveModules,
  alias: {
    react: require.resolve("react"),
    "react-dom": require.resolve("react-dom"),
  },
};

export default { isDev, isProd, resolvers };
