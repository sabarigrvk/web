import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import createRootReducer from "./rootReducer";

export const configureStore = ({ initialState, middleware = [] }) => {
  const store = createStore(createRootReducer, {}, applyMiddleware(thunk));

  return store;
};
