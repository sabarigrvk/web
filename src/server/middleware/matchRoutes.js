import { matchRoutes } from "react-router-config";
import Routes from "shared/Routes";

export default (req, res, next) => {
  const store = res.locals.store;
  const promises = matchRoutes(Routes, req.path).map(({ route }) => {
    return route.loadData ? route.loadData(store) : null;
  });
  res.locals.serverPromises = promises;
  next();
};
