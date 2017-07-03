import React, { Component } from 'react';
import { shallow } from 'enzyme';
import WidgetList from './WidgetList';
import WeekNumber from '../../widgets/WeekNumber/components/WeekNumber';
import NewRelicErrors from '../../widgets/NewRelicErrors/components/NewRelicErrors';
import BugsHistory from '../../widgets/BugsHistory/components/BugsHistory';

describe('WidgetList component', () => {
  const widget = shallow(<WidgetList />);
  it('contains the required components', () => {
    expect(widget.contains(<WeekNumber />)).toEqual(true);
    expect(widget.contains(<NewRelicErrors />)).toEqual(true);
    expect(widget.contains(<BugsHistory />)).toEqual(true);
  });
});
