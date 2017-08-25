import React from 'react';
import WidgetList from '../../containers/WidgetList/WidgetList';
import NavigationBar from '../NavigationBar/NavigationBar';
import RefreshAll from '../../containers/RefreshInterval/RefreshInterval';
import './Dashboard.scss';
import WidgetSettings from '../WidgetSettings/WidgetSettings';

const Dashboard = () =>
  <div className="Dashboard">
    <NavigationBar />
    <WidgetList />
    <RefreshAll />
    <WidgetSettings />
  </div>;

export default Dashboard;
