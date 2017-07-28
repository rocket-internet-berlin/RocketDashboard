import React from 'react';
import { shallow } from 'enzyme';
import Breakdown from './Breakdown';

describe('Breakdown component', () => {
  const dataValid = {
    results: [{ name: 'name 1', count: 1 }, { name: 'name 2', count: 2 }],
  };
  const heading = 'Some Heading';
  const description = 'Some Explanation';
  const widget = shallow(<Breakdown heading={heading} description={description} data={dataValid} />);

  it('contains the heading', () => {
    expect(widget.contains(heading)).toEqual(true);
  });

  it('contains the description', () => {
    expect(widget.contains(description)).toEqual(true);
  });

  it('does not contain the description', () => {
    const widgetNoDescription = shallow(<Breakdown heading={heading} data={dataValid} />);
    expect(widgetNoDescription.contains(description)).toEqual(false);
  });
});
