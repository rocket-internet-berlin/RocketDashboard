import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import forEach from 'lodash/forEach';

import './WidgetList.scss';
import { move as moveWidget, hover as hoverWidget } from './actions/widgetList';
import Number from '../../widgets/Number/components/Number';
import BugsHistory from '../../widgets/BugsHistory/components/BugsHistory';
import Breakdown from '../../widgets/Breakdown/components/Breakdown';
import Funnel from '../../widgets/Funnel/components/Funnel';
import Text from '../../widgets/Text/components/Text';
import Finance from '../../widgets/Finance/components/Finance';
import Weather from '../../widgets/Weather/components/Weather';
import constants from '../../config/constants';

export const WidgetList = props => {
  const widgetList = props.widgetList; // eslint-disable-line

  const displayWidgetInOrder = widgetListSettings => {
    const widgetComponents = [];
    const widgetType = constants.widgetType;

    forEach(widgetListSettings, widget => {
      const key = widget.key;
      switch (widget.type) {
        case widgetType.number:
          widgetComponents.push(
            <div className="col-xs-12 col-sm-6 col-md-3" key={key}>
              <Number
                id={widget.id}
                onMove={props.onMove}
                onHover={props.onHover}
                heading={widget.heading}
                iconType={widget.iconType}
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
              <Breakdown
                id={widget.id}
                onMove={props.onMove}
                onHover={props.onHover}
                heading={widget.heading}
                data={props[key]}
                iconType={widget.iconType}
              />
            </div>,
          );
          break;

        case widgetType.funnel:
          widgetComponents.push(
            <div className="col-xs-12 col-sm-6 col-md-3" key={key}>
              <Funnel
                id={widget.id}
                onMove={props.onMove}
                onHover={props.onHover}
                heading={widget.heading}
                data={props[key]}
                iconType={widget.iconType}
              />
            </div>,
          );
          break;

        case widgetType.bugsHistory:
          widgetComponents.push(
            <div className="col-xs-12" key={key}>
              <BugsHistory
                id={widget.id}
                onMove={props.onMove}
                onHover={props.onHover}
                history={props[key]}
                description={widget.description}
                iconType={widget.iconType}
              />
            </div>,
          );
          break;

        case widgetType.text:
          widgetComponents.push(
            <div className="col-xs-12 col-sm-6 col-md-3" key={key}>
              <Text
                id={widget.id}
                onMove={props.onMove}
                onHover={props.onHover}
                data={props[key]}
                heading={widget.heading}
                iconType={widget.iconType}
              />
            </div>,
          );
          break;

        case widgetType.finance:
          widgetComponents.push(
            <div className="col-xs-12 col-sm-6 col-md-3" key={key}>
              <Finance
                id={widget.id}
                onMove={props.onMove}
                onHover={props.onHover}
                finance={props[key]}
                iconType={widget.iconType}
              />
            </div>,
          );
          break;

        case widgetType.weather:
          widgetComponents.push(
            <div className="col-xs-12 col-sm-6 col-md-3" key={key}>
              <Weather
                id={widget.id}
                onMove={props.onMove}
                onHover={props.onHover}
                weather={props[key]}
                iconType={widget.iconType}
              />
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
  widgetList: state.widgetList.widgetList,
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

const mapDispatchToProps = dispatch => ({
  onHover: data => {
    dispatch(hoverWidget(data));
  },
  onMove: data => {
    dispatch(moveWidget(data));
  },
});

export default compose(DragDropContext(HTML5Backend), connect(mapStateToProps, mapDispatchToProps))(WidgetList);
