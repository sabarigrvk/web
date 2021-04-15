import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import routes from "config/routes";
import favicon from "assets/react.png";
import Home from "components/pages/Home";
import About from "components/pages/About";
export default function App() {
  return (
    <>
      <Helmet
        defaultTitle="React SSR Starter – Js Edition"
        titleTemplate="%s – React SSR Starter – Js Edition"
        link={[{ rel: "icon", type: "image/png", href: favicon }]}
      />
      <Switch>
        <Route exact path={routes.home} component={Home} />
        <Route exact path={routes.about} component={About} />
        <Route render={() => "404!"} />
      </Switch>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </>
  );
}
