import React from 'react';
import './WidgetList.scss';
import WeekNumber from '../WeekNumber/WeekNumber';
import BugsDiff from '../BugsDiff/BugsDiff';
import BugsHistory from '../BugsHistory/BugsHistory';

const WidgetList = () => (
  <div className="WidgetList container-fluid">
    <div className="row">
      <div className="col-xs-12 col-sm-6">
        <WeekNumber />
      </div>
      <div className="col-xs-12 col-sm-6">
        <BugsDiff />
      </div>
      <div className="col-xs-12">
        <BugsHistory />
      </div>
    </div>
  </div>
);

export default WidgetList;
