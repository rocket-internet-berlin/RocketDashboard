import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Dashboard from './containers/Dashboard';

describe('App component', () => {
  const app = shallow(<App />);

  it('contains a dashboard', () => {
    expect(app.contains(<Dashboard />)).toEqual(true);
  });
});
