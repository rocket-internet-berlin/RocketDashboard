import React from 'react';
import { shallow } from 'enzyme';
import App from '../src/App';
import Dashboard from '../src/components/Dashboard/Dashboard';

describe('App component', () => {
  const app = shallow(<App />);

  it('contains a dashboard', () => {
    expect(app.contains(<Dashboard />)).toEqual(true);
  });
});
