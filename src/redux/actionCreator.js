import * as actions from './actions' 

export const addOperator = (value) => {
  return {
    type: actions.OPERATOR,
    value
  }
}
export const addOperation = (operation) => {
  return {
    type: actions.OPERATION,
    operation
  }
}
export const getResult = (equals) => {
  return {
    type: actions.EQUALS,
    equals
  }
}
export const clear = () => {
  return {
    type: actions.CLEAR
  }
}
