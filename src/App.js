import React from 'react';
import './App.css';
import WidgetList from './components/WidgetList';
import Button from './components/Button';

const App = () => (
  <div className="App container">
    <Button label="Refresh" onClick={() => {}} />
    <WidgetList />
  </div>
);

export default App;
