import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { NavigationBar } from './NavigationBar';

describe('NavigationBar', () => {
  const refreshAll = sinon.spy();
  const fullScreenMode = false;
  const enterFullScreenMode = sinon.spy();
  const showWidgetModal = sinon.spy();
  const component = shallow(
    <NavigationBar
      refreshAll={refreshAll}
      showWidgetModal={showWidgetModal}
      fullScreenMode={fullScreenMode}
      enterFullScreenMode={enterFullScreenMode}
    />,
  );

  it('has a button that triggers `refreshAll` when clicked', () => {
    const button = component.find('.NavigationBar__refresh');
    expect(button.length).toBe(1);

    button.simulate('click');
    expect(refreshAll.calledOnce).toBe(true);
  });

  it('has a button that triggers `enterFullScreenMode` when clicked', () => {
    const fullScrnBtn = component.find('.NavigationBar__fullscreen');
    expect(fullScrnBtn).toHaveLength(1);

    fullScrnBtn.simulate('click');
    expect(enterFullScreenMode.calledOnce).toBe(true);
  });

  it('has a button that triggers `showWidgetModal` when clicked', () => {
    const settingsBtn = component.find('.NavigationBar__widget-settings');
    expect(settingsBtn).toHaveLength(1);

    settingsBtn.simulate('click');
    expect(showWidgetModal.calledOnce).toBe(true);
  });
});
