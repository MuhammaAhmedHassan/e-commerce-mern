import { createStore, applyMiddleware, compose, StoreEnhancer } from "redux";
import { routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";

import rootReducer from "./Reducers";
import history from "../pages/history";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
  }
}

const initialState = {};
const enhancers = [];
const middlewares = [thunk];

if (process.env.NODE_ENV === "development") {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers: StoreEnhancer<unknown, {}> = compose(
  applyMiddleware(routerMiddleware(history), ...middlewares),
  ...enhancers
);

export default createStore(rootReducer, initialState, composedEnhancers);
