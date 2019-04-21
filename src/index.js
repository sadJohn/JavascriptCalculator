import React from "react";
import ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";
import {store} from "./redux/store";
import App from "./App";
import {
  addOperator,
  addOperation,
  getResult,
  clear
} from "./redux/actionCreator";
import "./styles.css";

const mapStateToProps = state => {
  return {
    step: state,
    result: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addOperatorClick: value => {
      dispatch(addOperator(value));
    },
    addOperationClick: operation => {
      dispatch(addOperation(operation));
    },
    getResultClick: value => {
      dispatch(getResult(value));
    },
    clearClick: value => {
      dispatch(clear(value));
    }
  };
};

const Calculator = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <Calculator />
  </Provider>,
  rootElement
);
