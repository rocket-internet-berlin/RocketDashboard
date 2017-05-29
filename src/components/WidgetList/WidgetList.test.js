import React, { Component } from 'react';
import { shallow } from 'enzyme';
import WidgetList from './WidgetList';
import WeekNumber from '../WeekNumber/WeekNumber';
import BugsDiff from '../BugsDiff/BugsDiff';
import BugsHistory from '../BugsHistory/BugsHistory';

const { describe, it, expect } = global;

describe('WidgetList component', () => {
  const widget = shallow(<WidgetList />);
  it('contains WeekNumber, BugsDiff, and BugsHistory component', () => {
    expect(widget.contains(<WeekNumber />)).toEqual(true);
    expect(widget.contains(<BugsDiff />)).toEqual(true);
    expect(widget.contains(<BugsHistory />)).toEqual(true);
  });
});
