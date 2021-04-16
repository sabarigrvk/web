import { combineReducers } from "redux";
import userReducer from "./app/reducers";
export default combineReducers({
  users: userReducer,
});
