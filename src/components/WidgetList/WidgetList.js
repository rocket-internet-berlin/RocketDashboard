import React from 'react';
import './WidgetList.scss';
import WeekNumber from '../WeekNumber/WeekNumber';
import BugsDiff from '../BugsDiff/BugsDiff';
import BugsHistory from '../BugsHistory/BugsHistory';

const WidgetList = () => (
  <div className="row WidgetList">
    <div className="col-xs-6 col-sm-4 col-lg-3">
      <WeekNumber />
    </div>
    <div className="col-xs-6 col-sm-4 col-lg-3">
      <BugsDiff />
    </div>
    <div className="col-xs-12 col-sm-12 col-lg-6">
      <BugsHistory />
    </div>
  </div>
);

export default WidgetList;
