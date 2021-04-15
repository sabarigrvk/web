import React from "react";
import { StaticRouter as Router } from "react-router-dom";
import { renderToString } from "react-dom/server";
import { HelmetProvider } from 'react-helmet-async';
import Html from "./Html";
import App from "components/App";

const routerContext = {};
const helmetContext = {};

const serverRenderer = () => (req, res) => {
  const content = renderToString(
    <Router location={req.url} context={routerContext}>
      <HelmetProvider context={helmetContext}>
        <App />
      </HelmetProvider>
    </Router>
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
};

export default serverRenderer;
