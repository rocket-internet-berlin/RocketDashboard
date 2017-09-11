import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import forEach from 'lodash/forEach';
import Slider from 'react-slick';

import './WidgetList.scss';
import { move as moveWidget, hover as hoverWidget } from './actions/widgetList';
import WidgetComponentFactory from '../../factory/WidgetComponentFactory';

export const WidgetList = props => {
  const widgetList = props.widgetList; // eslint-disable-line

  const displayWidgetInOrder = widgetListSettings => {
    const widgetComponents = [];

    forEach(widgetListSettings, widget => {
      if (!widget.display) {
        return;
      }

      widgetComponents.push(WidgetComponentFactory.create(widget, props));
    });

    return widgetComponents;
  };

  const settings = {
    autoplay: true,
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
  };

  const renderWidgetList = () => {
    // eslint-disable-next-line
    if (props.fullScreenMode) {
      return <Slider {...settings}>{displayWidgetInOrder(widgetList)}</Slider>;
    }

    return displayWidgetInOrder(widgetList);
  };

  return (
    <div className="WidgetList">
      <div className="row">{renderWidgetList()}</div>
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
  githubPr: state.generic.github,
  customFunnel: state.generic.customFunnel,
  customBreakdown: state.generic.customBreakdown,
  trivia: state.generic.trivia,
  finance: state.finance.finance,
  twitterFeed: state.generic.twitterFeed,
  bugsHistory: state.bugsHistory,
  statusCakeHistory: state.statusCakeHistory,
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
  githubPr: {},
  customFunnel: {},
  customBreakdown: {},
  trivia: {},
  finance: {},
  twitterFeed: {},
  bugsHistory: [],
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
