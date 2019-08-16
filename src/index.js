import React from "react";
import ReactDOM from "react-dom";
import App from "./component/App";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import reducer from "./reducers/reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const STORE = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk, logger))
);

ReactDOM.render(
  <Provider store={STORE}>
    <App />
  </Provider>,
  document.getElementById("root")
);
