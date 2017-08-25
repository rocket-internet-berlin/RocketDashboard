import React from 'react';
import sinon from 'sinon';
import { shallow, mount, render } from 'enzyme';
import { NavigationBar } from './NavigationBar';

describe('NavigationBar', () => {
  it('has a button that triggers `refreshAll` when clicked', () => {
    const refreshAll = sinon.spy();
    const showWidgetModal = sinon.spy();
    const component = shallow(<NavigationBar refreshAll={refreshAll} showWidgetModal={showWidgetModal} />);
    const button = component.find('.NavigationBar__refresh');

    expect(button.length).toBe(1);

    button.simulate('click');

    expect(refreshAll.calledOnce).toBe(true);
  });
});
