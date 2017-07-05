import React from 'react';
import { shallow } from 'enzyme';
import Number from './Number';

describe('Number component', () => {
  const widget = shallow(<Number title="Test" data={{ current: 111, previous: 222 }} />);

  it('contains a title', () => {
    expect(widget.contains('Test')).toEqual(true);
  });
  it('contains a current value', () => {
    expect(widget.contains(111)).toEqual(true);
  });
  it('contains a previous value', () => {
    expect(widget.contains(222)).toEqual(true);
  });
});
