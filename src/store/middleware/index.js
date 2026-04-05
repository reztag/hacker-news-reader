import { applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import localStorageMiddleware from 'store/middleware/localStorageMiddleware';
import storageDefinitions from 'store/middleware/localStorageMiddleware/storageDefinitions';

const composeEnhancers =
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const middlewareList = [thunk, localStorageMiddleware(storageDefinitions)];

const middleware = composeEnhancers(
  applyMiddleware(...middlewareList),
);

export default middleware;
