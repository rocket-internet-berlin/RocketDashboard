import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import App from './App';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({ todos: [] });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><App /></Provider>, div);
});
