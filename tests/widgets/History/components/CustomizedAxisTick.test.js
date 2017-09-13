import React from 'react';
import { shallow } from 'enzyme';

import CustomizedAxisTick from '../../../../src/widgets/History/components/CustomizedAxisTick';

describe('CustomizedAxisTick component', () => {
  let widget;
  const testValue = 'Some number';
  const testProps = { x: 1, y: 2, stroke: 'yes', payload: { value: testValue } };

  describe('Checking basic rendering', () => {
    beforeEach(() => {
      widget = shallow(
        CustomizedAxisTick(testProps));
    });

    it('is rendered', () => {
      expect(widget.find('g').length).toBe(1);
    });
    it('displays the passed value', () => {
      expect(widget.find('text').contains(testValue)).toBe(true);
    });
  });
});
