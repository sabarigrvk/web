import { join } from "path";
import express from "express";
import cors from "cors";
import manifestHelpers from "express-manifest-helpers";
import paths from "../../config/paths";
import serverRenderer from "../middleware/renderer";
const { CLIENT_BUILD_DIR, PUBLIC_DIR } = paths;
const app = express();

app.use(PUBLIC_DIR, express.static(join(CLIENT_BUILD_DIR, PUBLIC_DIR)));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

const manifestPath = join(CLIENT_BUILD_DIR, PUBLIC_DIR);

app.use(
  manifestHelpers({
    manifestPath: `${manifestPath}/manifest.json`,
  })
);
// Register server-side rendering middleware
app.use(serverRenderer());

app.listen(process.env.PORT || 8500, () => {
  console.log(
    `[${new Date().toISOString()}]`,
    `App is running: http://localhost:${process.env.PORT || 8500}`
  );
});

export default app;
