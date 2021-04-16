import { join } from "path";
import express from "express";
import cors from "cors";
import manifestHelpers from "express-manifest-helpers";
import paths from "../../config/paths";
import createStore from "./middleware/createStore";
import matchRoutes from "./middleware/matchRoutes";
import renderer from "./middleware/renderer";
import errorHandler from "./middleware/errorHandler";
const { CLIENT_BUILD_DIR, PUBLIC_DIR } = paths;
const app = express();

app.use(PUBLIC_DIR, express.static(join(CLIENT_BUILD_DIR, PUBLIC_DIR)));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(createStore);

const manifestPath = join(CLIENT_BUILD_DIR, PUBLIC_DIR);

app.use(
  manifestHelpers({
    manifestPath: `${manifestPath}/manifest.json`,
  })
);
/**
 * given a url, we need to know which components we need to render without having to render our app
 * use matchRoutes middleware to achieve this
 */
app.use(matchRoutes);

// Register server-side rendering middleware
// TODO: check if serverRenderer() works
app.use(renderer);
app.use(errorHandler);

app.listen(process.env.PORT || 8500, () => {
  console.log(
    `[${new Date().toISOString()}]`,
    `App is running: http://localhost:${process.env.PORT || 8500}`
  );
});

export default app;
