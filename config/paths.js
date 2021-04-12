import { resolve } from "path";
import fs from "fs";

// eslint-disable-next-line security/detect-non-literal-fs-filename
const rootDir = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => resolve(rootDir, relativePath);

const paths = {
  HTML_TEMPLATE: resolveApp("config/webpack/template.html"),
  CLIENT_BUILD_DIR: resolveApp("build/client"),
  SERVER_BUILD_DIR: resolveApp("build/server"),
  DOTENV: resolveApp(".env"),
  SRC_DIR: resolveApp("src"),
  CLIENT_SRC_DIR: resolveApp("src/client"),
  SERVER_SRC_DIR: resolveApp("src/server"),
  CONFIG_DIR: resolveApp("config"),
  PUBLIC_DIR: "/static/",
};

paths.resolveModules = [
  paths.CLIENT_SRC_DIR,
  paths.SERVER_SRC_DIR,
  paths.SRC_DIR,
  "node_modules",
];

export default paths;
