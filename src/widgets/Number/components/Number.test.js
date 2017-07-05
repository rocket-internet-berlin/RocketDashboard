import React from 'react';
import { shallow } from 'enzyme';
import Number from './Number';

describe('Number component', () => {
  const widget = shallow(<Number title="Some number" data={{ current: 9, previous: 99 }} />);

  it('contains a title', () => {
    expect(widget.contains('Some number')).toEqual(true);
  });
  it('contains a current value', () => {
    expect(widget.contains(9)).toEqual(true);
  });
  it('contains a previous value', () => {
    expect(widget.contains(99)).toEqual(true);
  });
});
