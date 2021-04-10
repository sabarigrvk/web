import { resolve } from "path";
import fs from "fs";

// eslint-disable-next-line security/detect-non-literal-fs-filename
const rootDir = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => resolve(rootDir, relativePath);

const paths = {
  HTML_TEMPLATE: resolveApp("config/webpack/template.html"),
  CLIENT_BUILD: resolveApp("build/client"),
  SERVER_BUILD: resolveApp("build/server"),
  DOTENV: resolveApp(".env"),
  SRC: resolveApp("src"),
  CLIENT_SRC: resolveApp("src/client"),
  SERVER_SRC: resolveApp("src/server"),
  PUBLIC: "/static/",
};

paths.resolveModules = [
  paths.CLIENT_SRC,
  paths.SERVER_SRC,
  paths.SRC,
  "node_modules",
];

export default paths;
