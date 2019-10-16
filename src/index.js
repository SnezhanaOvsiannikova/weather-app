import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Weather from "./containers/Weather";
import store from "./store/store";
import "bootstrap/dist/css/bootstrap.min.css";
import "./common.css";

ReactDOM.render(
  <Provider store={store}>
    <Weather />
  </Provider>,
  document.getElementById("root")
);
