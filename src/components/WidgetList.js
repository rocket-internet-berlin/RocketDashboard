import React from 'react';
import WeekNumber from '../components/WeekNumber';
import BugsDiff from '../components/BugsDiff';

const WidgetList = () => (
  <div className="row">
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
