import React from 'react';
import './WidgetList.scss';
import WeekNumber from '../../widgets/WeekNumber/components/WeekNumber';
import NewRelicErrors
  from '../../widgets/NewRelicErrors/components/NewRelicErrors';
import BugsHistory from '../../widgets/BugsHistory/components/BugsHistory';
import JiraIssues from '../JiraIssues/JiraIssues';

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
