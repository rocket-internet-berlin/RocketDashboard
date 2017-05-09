import React from 'react';
import './WidgetList.css';
import WeekNumber from '../WeekNumber';
import BugsDiff from '../BugsDiff';

const WidgetList = () => (
  <div className="row WidgetList">
    <div className="col-md-4">
      <WeekNumber />
    </div>
    <div className="col-md-4">
      <BugsDiff />
    </div>
    <div className="col-md-4">
      <WeekNumber />
    </div>
    <div className="col-md-4">
      <BugsDiff />
    </div>
  </div>
);

export default WidgetList;
