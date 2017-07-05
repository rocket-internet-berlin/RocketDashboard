import React, { Component } from 'react';
import { shallow } from 'enzyme';
import Number from './Number';

describe('Number component', () => {
  const title = 'Test';
  const data = {
    current: 111,
    previous: 222,
  };
  const widget = shallow(<Number title={title} data={data} />);

  it('contains the provided data', () => {
    expect(widget.contains(title)).toEqual(true);
    expect(widget.contains(data.current)).toEqual(true);
    expect(widget.contains(data.previous)).toEqual(true);
  });
});
