import React from "react";
import { hydrate } from "react-dom";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import App from "components/App";

let history = createBrowserHistory();

hydrate(
  <Router history={history}>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </Router>,
  document.getElementById("app")
);

if (process.env.NODE_ENV === "development") {
  if (module.hot) {
    module.hot.accept();
  }
}
