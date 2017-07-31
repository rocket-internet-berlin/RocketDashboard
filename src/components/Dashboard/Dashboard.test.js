import React from 'react';
import { shallow, mount } from 'enzyme';
import Dashboard from './Dashboard';
import WidgetList from '../../containers/WidgetList/WidgetList';
import NavigationBar from '../NavigationBar/NavigationBar';
import RefreshAll from '../../containers/RefreshInterval/RefreshInterval';

describe('<Dashboard />', () => {
  const component = shallow(<Dashboard />);

  it('contains necessary componenets', () => {
    expect(component.contains(<WidgetList />)).toEqual(true);
    expect(component.contains(<NavigationBar />)).toEqual(true);
    expect(component.contains(<RefreshAll />)).toEqual(true);
  });
});
