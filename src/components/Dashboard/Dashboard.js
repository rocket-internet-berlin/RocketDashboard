/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import WidgetList from '../../containers/WidgetList/WidgetList';
import NavigationBar from '../NavigationBar/NavigationBar';
import RefreshAll from '../../containers/RefreshInterval/RefreshInterval';
import WidgetSettings from '../WidgetSettings/WidgetSettings';
import './Dashboard.scss';
import FullScreen from '../FullScreen/FullScreen';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullScreenActive: false,
    };

    this.toggleFullScreenState = this.toggleFullScreenState.bind(this);
    this.enterFullScreenMode = this.enterFullScreenMode.bind(this);
    this.onExitFullScreenMode = this.onExitFullScreenMode.bind(this);
  }

  onExitFullScreenMode() {
    this.setState({ fullScreenActive: false });
  }

  toggleFullScreenState() {
    if (this.state.fullScreenActive) {
      this.setState({ fullScreenActive: false });
    } else {
      this.setState({ fullScreenActive: true });
    }
  }

  enterFullScreenMode() {
    this.toggleFullScreenState();
  }

  render() {
    return (
      <FullScreen active={this.state.fullScreenActive} handleExitFullScreen={this.onExitFullScreenMode}>
        <div className="Dashboard">
          <NavigationBar fullScreenMode={this.state.fullScreenActive} enterFullScreenMode={this.enterFullScreenMode} />
          <WidgetList fullScreenMode={this.state.fullScreenActive} />
          <RefreshAll />
          <WidgetSettings />
        </div>
      </FullScreen>
    );
  }
}

export default Dashboard;
