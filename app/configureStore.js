import {createStore, applyMiddleware} from 'redux';
import thunkMiddleMiddleware from './utils/thunkFetchMiddleware.js';
import loggerMiddleware from 'redux-logger';
import rootReducer from './reducers/index.js';

const createStoreWidthMiddleware = applyMiddleware(
  thunkMiddleMiddleware,
  loggerMiddleware(),
)(createStore);

export default function configureStore(initialState) {
    return createStoreWidthMiddleware(rootReducer, initialState);
}
