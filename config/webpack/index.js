import merge from "webpack-merge";
import clientConfig from "./client";
import serverConfig from "./server";
export default (env = "production") => {
  const baseConfig = {
    mode: env,
  };
  return [
    merge(baseConfig, clientConfig[env]),
    merge(baseConfig, serverConfig[env]),
  ];
};
