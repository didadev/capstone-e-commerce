import { createStore, compose, applyMiddleware } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

const myLoggerMiddleware = (store) => (next) => (action) => {
  console.log("hak", action);
  if (!action.type) return next(action);
  console.log("Action Type: ", action.type);
  console.log("Action payload: ", action.payload);
  console.log("current state : ", store.getState());
  next(action);
  console.log("Next state ", store.getState());
};
//const middlewares = [logger];
const middlewares = [myLoggerMiddleware];

const composedEnhancers = compose(applyMiddleware(...middlewares));

export const store = createStore(rootReducer, undefined, composedEnhancers);
