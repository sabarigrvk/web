import React from "react";
import { StaticRouter as Router } from "react-router-dom";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import Html from "components/Html";
import App from "shared/components/App";

const routerContext = {};
const helmetContext = {};

const serverRenderer = (req, res, next) => {
  const serverPromises = res.locals.serverPromises;
  Promise.all(serverPromises).then(() => {
    const content = renderToString(
      <Provider store={res.locals.store}>
        <Router location={req.url} context={routerContext}>
          <HelmetProvider context={helmetContext}>
            <App />
          </HelmetProvider>
        </Router>
      </Provider>
    );

    return res.send(
      "<!doctype html>" +
        renderToString(
          <Html
            css={[
              res.locals.assetPath("bundle.css"),
              res.locals.assetPath("vendor.css"),
            ]}
            scripts={[
              res.locals.assetPath("bundle.js"),
              res.locals.assetPath("vendor.js"),
            ]}
            helmetContext={helmetContext}
          >
            {content}
          </Html>
        )
    );
  });
};

export default serverRenderer;
