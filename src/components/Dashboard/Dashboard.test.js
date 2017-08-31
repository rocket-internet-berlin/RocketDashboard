import React from 'react';
import { shallow } from 'enzyme';
import Dashboard from './Dashboard';
import WidgetList from '../../containers/WidgetList/WidgetList';
import RefreshAll from '../../containers/RefreshInterval/RefreshInterval';
import WidgetSettings from '../WidgetSettings/WidgetSettings';
import FullScreen from '../FullScreen/FullScreen';

describe('<Dashboard />', () => {
  const component = shallow(<Dashboard />);
  const active = false;

  it('contains necessary componenets', () => {
    expect(component.find(FullScreen)).toHaveLength(1);
    expect(component.find('.Dashboard')).toHaveLength(1);
    expect(component.find('.Dashboard').children()).toHaveLength(4);

    const dashboard = component.find('.Dashboard').children();
    expect(dashboard.contains(<WidgetList fullScreenMode={active} />)).toEqual(true);
    expect(dashboard.contains(<RefreshAll />)).toEqual(true);
    expect(dashboard.contains(<WidgetSettings />)).toEqual(true);
  });

  it('handles `enterFullScreenMode` action correctly', () => {
    expect(component.state('fullScreenActive')).toEqual(false);
    component.instance().enterFullScreenMode();
    expect(component.state('fullScreenActive')).toEqual(true);
  });

  it('handles `onExitFullScreenMode` action correctly', () => {
    component.setState({ fullScreenActive: true });
    expect(component.state('fullScreenActive')).toEqual(true);

    component.instance().onExitFullScreenMode();
    expect(component.state('fullScreenActive')).toEqual(false);
  });

  it('does `toggleFullScreenState` correctly', () => {
    component.setState({ fullScreenActive: true });
    expect(component.state('fullScreenActive')).toEqual(true);

    component.instance().toggleFullScreenState();
    expect(component.state('fullScreenActive')).toEqual(false);

    component.instance().toggleFullScreenState();
    expect(component.state('fullScreenActive')).toEqual(true);
  });
});
