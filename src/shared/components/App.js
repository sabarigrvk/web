import React from "react";
import { Link } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { Helmet } from "react-helmet-async";
import Routes from "shared/Routes";
import favicon from "shared/assets/react.png";

export default function App() {
  return (
    <>
      <Helmet
        defaultTitle="React SSR Starter – Js Edition"
        titleTemplate="%s – React SSR Starter – Js Edition"
        link={[{ rel: "icon", type: "image/png", href: favicon }]}
      />
      {renderRoutes(Routes)}
    </>
  );
}
