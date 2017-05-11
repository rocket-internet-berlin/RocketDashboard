import React from 'react';
import './WidgetList.scss';
import WeekNumber from '../WeekNumber';
import BugsDiff from '../BugsDiff';

const WidgetList = () => (
  <div className="row WidgetList">
    <div className="col-xs-6 col-sm-4 col-lg-3">
      <WeekNumber />
    </div>
    <div className="col-xs-6 col-sm-4 col-lg-3">
      <BugsDiff />
    </div>
    <div className="col-xs-6 col-sm-4 col-lg-3">
      <WeekNumber />
    </div>
    <div className="col-xs-6 col-sm-4 col-lg-3">
      <BugsDiff />
    </div>
  </div>
);

export default WidgetList;
