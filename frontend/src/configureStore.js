import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const preloadedState = {};

let middlewares = [thunk];

export default reducers =>
  createStore(
    reducers,
    preloadedState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );
