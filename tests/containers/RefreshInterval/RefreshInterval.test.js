import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { RefreshInterval } from '../../../src/containers/RefreshInterval/RefreshInterval';

describe('<RefreshInterval />', () => {
  const refreshAll = () => {};

  it('calls componentDidMount', () => {
    sinon.spy(RefreshInterval.prototype, 'componentDidMount');
    const wrapper = mount(<RefreshInterval refreshAll={refreshAll} />);
    expect(RefreshInterval.prototype.componentDidMount.calledOnce).toEqual(true);
  });
});
