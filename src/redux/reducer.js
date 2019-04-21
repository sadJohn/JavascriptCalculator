import * as actions from "./actions";

let step = "";
let result = 0;
let stepStack = [0];
let resultStack = [];
let operatorStack = [0];
let operationStack = [];
let flagOperator = true;
let flagOperation = true;
let startNumber = 0;
let firstTimeExe = true;

const defaultState = {
  step,
  result
};

export const calculator = (state = defaultState, action) => {
  switch (action.type) {
    case actions.OPERATOR:
      if (firstTimeExe) {
        stepStack.pop();
        firstTimeExe = false;
      }
      if (startNumber === 1 && action.value === "0") break;
      if (resultStack.indexOf(".") !== -1 && action.value === ".") break;
      if (action.value === "0") startNumber++;

      if (operatorStack.length === 0 && action.value === ".") {
        stepStack.push(0);
        stepStack.push(action.value);
        step = stepStack.join("");
        resultStack.push(0);
        resultStack.push(action.value);
        result = resultStack.join("");
      } else {
        stepStack.push(action.value);
        step = stepStack.join("");
        resultStack.push(action.value);
        result = resultStack.join("");
      }

      if (flagOperator) {
        let num = operatorStack[operatorStack.length - 1] + action.value;
        if (operatorStack.length === 0) {
          num = action.value;
        }
        operatorStack.pop();
        operatorStack.push(num);
      } else {
        operatorStack.push(action.value);
        flagOperator = true;
      }
      flagOperation = true;

      return {
        step,
        result
      };
    case actions.OPERATION:
      if (firstTimeExe) firstTimeExe = false;
      if (!flagOperation) break;
      flagOperator = false;
      flagOperation = false;
      startNumber = 0;
      operationStack.push(action.operation);
      stepStack.push(action.operation);
      step = stepStack.join("");
      resultStack = [];

      if (operationStack[operationStack.length - 2] === "x") {
        let num =
          Math.round(
            operatorStack[operatorStack.length - 2] *
              operatorStack[operatorStack.length - 1] *
              100000
          ) / 100000;
        operatorStack.pop();
        operatorStack.pop();
        operatorStack.push(num);
        operationStack.splice(operationStack.length - 2, 1);
      }
      if (operationStack[operationStack.length - 2] === "/") {
        let num =
          Math.round(
            (operatorStack[operatorStack.length - 2] /
              operatorStack[operatorStack.length - 1]) *
              100000
          ) / 100000;
        operatorStack.pop();
        operatorStack.pop();
        operatorStack.push(num);
        operationStack.splice(operationStack.length - 2, 1);
      }

      return {
        step,
        result: action.value
      };
    case actions.EQUALS:
      if (stepStack[0] === undefined) break;
      if (stepStack[stepStack.length - 2] === "=") break;
      if (
        stepStack[stepStack.length - 1] === "+" ||
        stepStack[stepStack.length - 1] === "-" ||
        stepStack[stepStack.length - 1] === "x" ||
        stepStack[stepStack.length - 1] === "/"
      )
        break;
      stepStack.push(action.equals);

      if (operationStack[operationStack.length - 1] === "x") {
        let num =
          Math.round(
            operatorStack[operatorStack.length - 2] *
              operatorStack[operatorStack.length - 1] *
              100000
          ) / 100000;
        operatorStack.pop();
        operatorStack.pop();
        operatorStack.push(num);
        operationStack.splice(operationStack.length - 1, 1);
      }
      if (operationStack[operationStack.length - 1] === "/") {
        let num =
          Math.round(
            (operatorStack[operatorStack.length - 2] /
              operatorStack[operatorStack.length - 1]) *
              100000
          ) / 100000;
        operatorStack.pop();
        operatorStack.pop();
        operatorStack.push(num);
        operationStack.splice(operationStack.length - 1, 1);
      }
      let sum = operatorStack[0];
      for (let i = 1; i < operatorStack.length; i++) {
        if (operationStack[i - 1] === "+") {
          sum =
            Math.round((Number(sum) + Number(operatorStack[i])) * 100000) /
            100000;
        } else {
          sum = Math.round((sum - operatorStack[i]) * 100000) / 100000;
        }
      }
      stepStack.push(sum);
      step = stepStack.join("");

      stepStack = [];
      stepStack.push(sum);
      operationStack = [];
      operatorStack = [];
      operatorStack.push(sum);

      return {
        step,
        result: sum
      };
    case actions.CLEAR:
      stepStack = [0];
      resultStack = [];
      operationStack = [];
      operatorStack = [0];
      flagOperator = true;
      firstTimeExe = true;
      return {
        step: "",
        result: 0
      };
    default:
      return state;
  }
};
