/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import WidgetList from '../components/WidgetList/WidgetList';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import './Dashboard.css';

class Dashboard extends Component {
  render() {
    return (
      <div className="Dashboard container">
        <NavigationBar />
        <WidgetList />
      </div>
    );
  }
}

export default Dashboard;
