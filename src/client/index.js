import React from "react";
import { hydrate } from "react-dom";
import App from "../components/app";
import "./app.css";
import styles from "./styles.module.css";

hydrate(<App />, document.getElementById("app"));

if (process.env.NODE_ENV === "development") {
  if (module.hot) {
    module.hot.accept();
  }
}
