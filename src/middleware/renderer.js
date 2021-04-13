import React from "react";
import { renderToString } from "react-dom/server";
import Html from "./Html";
import App from "../components/app";

const serverRenderer = () => (req, res) => {
  const content = renderToString(<App />);

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
        >
          {content}
        </Html>
      )
  );
};

export default serverRenderer;
