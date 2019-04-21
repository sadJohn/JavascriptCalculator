import React from "react";

export default class App extends React.Component {
  operatorClick = text => {
    this.props.addOperatorClick(text);
  };
  clear = () => {
    this.props.clearClick();
  };
  operationClick = text => {
    this.props.addOperationClick(text);
  };
  resultClick = text => {
    this.props.getResultClick(text);
  };
  onClick = e => {
    let action = e.target.dataset.action;
    let text = e.target.textContent;
    if (action) {
      this[action](text);
    }
  };

  render() {
    return (
      <div id="container" onClick={this.onClick}>
        <div id="display">
          <div id="step">{this.props.result.step}</div>
          <div id="result">{this.props.result.result}</div>
        </div>
        <button id="clear" data-action="clear">
          AC
        </button>
        <button id="divide" data-action="operationClick">
          /
        </button>
        <button id="multiply" data-action="operationClick">
          x
        </button>
        <button id="seven" data-action="operatorClick">
          7
        </button>
        <button id="eight" data-action="operatorClick">
          8
        </button>
        <button id="nine" data-action="operatorClick">
          9
        </button>
        <button id="subtract" data-action="operationClick">
          -
        </button>
        <button id="four" data-action="operatorClick">
          4
        </button>
        <button id="five" data-action="operatorClick">
          5
        </button>
        <button id="six" data-action="operatorClick">
          6
        </button>
        <button id="add" data-action="operationClick">
          +
        </button>
        <button id="one" data-action="operatorClick">
          1
        </button>
        <button id="two" data-action="operatorClick">
          2
        </button>
        <button id="three" data-action="operatorClick">
          3
        </button>
        <button id="equals" data-action="resultClick">
          =
        </button>
        <button id="zero" data-action="operatorClick">
          0
        </button>
        <button id="decimal" data-action="operatorClick">
          .
        </button>
      </div>
    );
  }
}
