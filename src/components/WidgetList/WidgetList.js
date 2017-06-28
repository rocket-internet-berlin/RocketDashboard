import React from 'react';
import './WidgetList.scss';
import WeekNumber from '../WeekNumber/WeekNumber';
import NewRelicErrors
  from '../../widgets/NewRelicErrors/components/NewRelicErrors';
import BugsHistory from '../BugsHistory/BugsHistory';

const WidgetList = () => (
  <div className="WidgetList container-fluid">
    <div className="row">
      <div className="col-xs-12 col-sm-6">
        <WeekNumber />
      </div>
      <div className="col-xs-12 col-sm-6">
        <NewRelicErrors />
      </div>
      <div className="col-xs-12">
        <BugsHistory />
      </div>
    </div>
  </div>
);

export default WidgetList;
