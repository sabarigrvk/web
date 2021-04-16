import { configureStore } from "shared/store";

export default (req, res, next) => {
  res.locals.store = configureStore({});
  next();
};
