import React from "react";
import { hydrate } from "react-dom";
import App from "../components/app";
import styles from "./styles.module.css";

hydrate(
  <div className={styles.root}>
    <App />
  </div>,
  document.getElementById("app")
);

if (process.env.NODE_ENV === "development") {
  if (module.hot) {
    module.hot.accept();
  }
}
