import React from 'react';
import WidgetList from '../../containers/WidgetList/WidgetList';
import NavigationBar from '../NavigationBar/NavigationBar';
import RefreshAll from '../../containers/RefreshInterval/RefreshInterval';
import './Dashboard.scss';

const Dashboard = () =>
  <div className="Dashboard">
    <NavigationBar />
    <WidgetList />
    <RefreshAll />
  </div>;

export default Dashboard;
