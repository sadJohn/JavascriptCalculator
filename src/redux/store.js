import {createStore} from 'redux';
import {calculator} from './reducer'

export const store = createStore(
  calculator,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );