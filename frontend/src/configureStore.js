import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

const configureStore = reducers =>
  createStore(reducers, applyMiddleware(thunk));

export default configureStore;
