/* eslint no-underscore-dangle: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './App';
import reducer from './reducers';

const storeEnhancers = [applyMiddleware(thunk)];

if (
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  process.env.NODE_ENV === 'development'
) {
  storeEnhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}

const store = createStore(reducer, compose(...storeEnhancers));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
