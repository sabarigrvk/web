import Home, { loadData } from "shared/components/pages/Home";
import About from "shared/components/pages/About";
const routes = [
  {
    path: "/",
    component: Home,
    exact: true,
    loadData,
  },
  {
    path: "/about",
    component: About,
    exact: true,
  },
];

export const getRoute = (path, params, routesConfig) =>
  path.split(".").reduce((routeBranch, pathItem) => {
    if (routeBranch && routeBranch[pathItem]) {
      const route = routeBranch[pathItem];
      if (typeof route === "string") {
        if (!params || typeof params === "undefined") {
          return route;
        }

        return Object.entries(params).reduce((replaced, [key, value]) => {
          return replaced.replace(`:${key}`, String(value));
        }, route);
      }
      return routeBranch[pathItem];
    }
  }, routesConfig);

export default routes;
