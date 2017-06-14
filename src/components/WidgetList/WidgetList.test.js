import React, { Component } from 'react';
import { shallow } from 'enzyme';
import WidgetList from './WidgetList';
import WeekNumber from '../WeekNumber/WeekNumber';
import NewRelicErrors from '../NewRelicErrors/NewRelicErrors';
import BugsHistory from '../BugsHistory/BugsHistory';

describe('WidgetList component', () => {
  const widget = shallow(<WidgetList />);
  it('contains the required components', () => {
    expect(widget.contains(<WeekNumber />)).toEqual(true);
    expect(widget.contains(<NewRelicErrors />)).toEqual(true);
    expect(widget.contains(<BugsHistory />)).toEqual(true);
  });
});
