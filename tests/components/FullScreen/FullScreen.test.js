import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import FullScreen from '../../../src/components/FullScreen/FullScreen';

describe('FullScreen', () => {
  const handleExitFullScreen = sinon.spy();

  it('render', () => {
    const component = shallow(
      <FullScreen handleExitFullScreen={handleExitFullScreen}>
        <div className="child-div" />
      </FullScreen>,
    );

    expect(component).toHaveLength(1);
    expect(component.find('.child-div')).toHaveLength(1);
  });
});
