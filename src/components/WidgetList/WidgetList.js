import React from 'react';
import './WidgetList.scss';
import WeekNumber from '../WeekNumber/WeekNumber';
import NewRelicErrors from '../NewRelicErrors/NewRelicErrors';
import JiraIssues from '../JiraIssues/JiraIssues';
import BugsHistory from '../BugsHistory/BugsHistory';

const WidgetList = () => (
  <div className="WidgetList container-fluid">
    <div className="row">
      <div className="col-xs-12 col-sm-4">
        <WeekNumber />
      </div>
      <div className="col-xs-12 col-sm-4">
        <NewRelicErrors />
      </div>
      <div className="col-xs-12 col-sm-4">
        <JiraIssues />
      </div>
      <div className="col-xs-12">
        <BugsHistory />
      </div>
    </div>
  </div>
);

export default WidgetList;
