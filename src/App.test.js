import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Dashboard from './components/Dashboard/Dashboard';

describe('App component', () => {
  const app = shallow(<App />);

  it('contains a dashboard', () => {
    expect(app.contains(<Dashboard />)).toEqual(true);
  });
});
