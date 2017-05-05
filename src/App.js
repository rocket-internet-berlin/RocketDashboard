import React, { Component } from 'react';
import 'milligram';
import './App.css';
import WidgetList from './components/WidgetList';

class App extends Component {
  render() {
    return (
      <div className="App container">
        <WidgetList />
      </div>
    );
  }
}

export default App;
