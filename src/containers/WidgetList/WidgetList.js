import React from 'react';
import { connect } from 'react-redux';
import assign from 'lodash/assign';
import forEach from 'lodash/forEach';
import isEmpty from 'lodash/isEmpty';

import './WidgetList.scss';
import Number from '../../widgets/Number/components/Number';
import BugsHistory from '../../widgets/BugsHistory/components/BugsHistory';
import Breakdown from '../../widgets/Breakdown/components/Breakdown';
import Funnel from '../../widgets/Funnel/components/Funnel';
import Trivia from '../../widgets/Trivia/components/Trivia';
import Finance from '../../widgets/Finance/components/Finance';
import constants from '../../config/constants';
import userSettings from '../../config/userSettings';

export const WidgetList = props => {
  let widgetList = {};
  const localSettings = localStorage.getItem('userSettings');

  try {
    widgetList = JSON.parse(localSettings).widgetList;
  } catch (e) {
    widgetList = null;
  }

  if (isEmpty(widgetList)) {
    widgetList = userSettings.widgetList;
    localStorage.setItem('userSettings', JSON.stringify({ widgetList }));
  } else {
    widgetList = assign(userSettings.widgetList, widgetList);
  }

  const displayWidgetInOrder = widgetListSettings => {
    const widgetComponents = [];
    const widgetType = constants.widgetType;

    forEach(widgetListSettings, (widget, key) => {
      switch (widget.type) {
        case widgetType.number:
          widgetComponents.push(
            <div className="col-xs-12 col-sm-6 col-md-3" key={key}>
              <Number
                heading={widget.heading}
                data={props[key]}
                threshold={widget.threshold}
                riseIsBad={widget.riseIsBad}
              />
            </div>,
          );
          break;

        case widgetType.breakdown:
          widgetComponents.push(
            <div className="col-xs-12 col-sm-6 col-md-3" key={key}>
              <Breakdown heading={widget.heading} data={props[key]} />
            </div>,
          );
          break;

        case widgetType.funnel:
          widgetComponents.push(
            <div className="col-xs-12 col-sm-6 col-md-3" key={key}>
              <Funnel heading={widget.heading} data={props[key]} />
            </div>,
          );
          break;

        case widgetType.bugsHistory:
          widgetComponents.push(
            <div className="col-xs-12" key={key}>
              <BugsHistory />
            </div>,
          );
          break;

        case widgetType.trivia:
          widgetComponents.push(
            <div className="col-xs-12 col-sm-6 col-md-3" key={key}>
              <Trivia data={props[key]} />
            </div>,
          );
          break;

        case widgetType.finance:
          widgetComponents.push(
            <div className="col-xs-12 col-sm-6 col-md-3" key={key}>
              <Finance />
            </div>,
          );
          break;

        default:
          break;
      }
    });

    return widgetComponents;
  };

  return (
    <div className="WidgetList">
      <div className="row">
        {displayWidgetInOrder(widgetList)}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  weekNumber: state.generic.weekNumber,
  newRelicLoadTime: state.generic.newRelicLoadTime,
  newRelicErrors: state.generic.newRelicErrors,
  newRelicUniqueSessions: state.generic.newRelicUniqueSessions,
  newRelicSuccessfulBookings: state.generic.newRelicSuccessfulBookings,
  newRelicCliErrors: state.generic.newRelicCliErrors,
  newRelicErrorBreakdown: state.generic.newRelicErrorBreakdown,
  newRelicWebsiteFunnel: state.generic.newRelicWebsiteFunnel,
  jiraInProgress: state.generic.jiraInProgress,
  jiraSelectedForDevelopment: state.generic.jiraSelectedForDevelopment,
  jiraReadyForQa: state.generic.jiraReadyForQa,
  customNumber: state.generic.customNumber,
  customFunnel: state.generic.customFunnel,
  customBreakdown: state.generic.customBreakdown,
  trivia: state.generic.trivia,
});

WidgetList.defaultProps = {
  newRelicErrors: {},
  newRelicLoadTime: {},
  newRelicUniqueSessions: {},
  newRelicSuccessfulBookings: {},
  newRelicCliErrors: {},
  weekNumber: {},
  newRelicErrorBreakdown: {},
  newRelicWebsiteFunnel: {},
  jiraInProgress: {},
  jiraSelectedForDevelopment: {},
  jiraReadyForQa: {},
  customNumber: {},
  customFunnel: {},
  customBreakdown: {},
  trivia: {},
};

export default connect(mapStateToProps)(WidgetList);
