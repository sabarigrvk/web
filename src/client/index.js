import React from "react";
import { hydrate } from "react-dom";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { configureStore } from "shared/store";
import App from "shared/components/App";

let history = createBrowserHistory();
const store = configureStore({});

hydrate(
  <Provider store={store}>
    <Router history={history}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Router>
  </Provider>,
  document.getElementById("app")
);

if (process.env.NODE_ENV === "development") {
  if (module.hot) {
    module.hot.accept();
  }
}
