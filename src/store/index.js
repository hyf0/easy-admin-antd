import { createStore, combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { history } from '@/router/AppRouter';
import loginReducer from './login/reducer';

export { default as actions } from './actions';
export { default as actionTypes } from './actionTypes';

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    login: loginReducer,
  });

export default createStore(
  createRootReducer(history),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
