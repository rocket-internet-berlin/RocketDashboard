import React from 'react';
import { shallow } from 'enzyme';
import Number from './Number';

describe('Number component', () => {
  const widget = shallow(<Number title="Some number" data={{ current: 99, previous: 9 }} />);

  it('contains a title', () => {
    expect(widget.contains('Some number')).toEqual(true);
  });
  it('contains a current value', () => {
    expect(widget.contains(99)).toEqual(true);
  });
  it('contains percentage', () => {
    expect(widget.contains(1000)).toEqual(true);
  });
});
