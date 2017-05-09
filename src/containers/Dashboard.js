/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import WidgetList from '../components/WidgetList/WidgetList';
import NavigationBar from '../components/NavigationBar/NavigationBar';

class Dashboard extends Component {
  render() {
    return (
      <div className="container">
        <NavigationBar />
        <WidgetList />
      </div>
    );
  }
}

export default Dashboard;
