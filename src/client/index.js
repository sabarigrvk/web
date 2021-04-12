import { hydrate } from "react-dom";
import App from "../components/app";

hydrate(<App />, document.getElementById("app"));

if (process.env.NODE_ENV === "development") {
  if (module.hot) {
    module.hot.accept();
  }
}
