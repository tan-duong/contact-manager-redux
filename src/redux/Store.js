import { createStore, applyMiddleware, compose } from "redux";

import promiseMiddleware from 'redux-promise';

import rootReducer from "./reducers";

const initState = {};

//const middleware = [...thunk];

const store = createStore(
  rootReducer,
  initState,
  compose(
    applyMiddleware(promiseMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

// const store = createStore(
//   rootReducer,
//   applyMiddleware(promiseMiddleware)
// );

export default store