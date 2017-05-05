import React, { Component } from 'react';
import './App.css';
import 'milligram';
import WidgetList from './containers/WidgetList';

class App extends Component {
  render() {
    return (
      <div className="App container">
        <WidgetList></WidgetList>
      </div>
    );
  }
}

export default App;
