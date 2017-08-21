import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './WidgetList.scss';
import Number from '../../widgets/Number/components/Number';
import BugsHistory from '../../widgets/BugsHistory/components/BugsHistory';
import Breakdown from '../../widgets/Breakdown/components/Breakdown';
import Funnel from '../../widgets/Funnel/components/Funnel';
import Trivia from '../../widgets/Trivia/components/Trivia';
import Finance from '../../widgets/Finance/components/Finance';

export const WidgetList = props =>
  <div className="WidgetList">
    <div className="row">
      <div className="col-xs-12 col-sm-6 col-md-3">
        <Finance />
      </div>
      <div className="col-xs-12 col-sm-6 col-md-3">
        <Number heading="Week" data={props.weekNumber} />
      </div>
      <div className="col-xs-12 col-sm-6 col-md-3">
        <Number heading="Load Time (s)" data={props.newRelicLoadTime} riseIsBad threshold={0.33} />
      </div>
      <div className="col-xs-12 col-sm-6 col-md-3">
        <Number heading="Transaction Errors" data={props.newRelicErrors} riseIsBad threshold={1} />
      </div>
      <div className="col-xs-12 col-sm-6 col-md-3">
        <Number heading="Unique Sessions" data={props.newRelicUniqueSessions} />
      </div>
      <div className="col-xs-12 col-sm-6 col-md-3">
        <Number heading="Successful Bookings" data={props.newRelicSuccessfulBookings} />
      </div>
      <div className="col-xs-12 col-sm-6 col-md-3">
        <Number heading="CLI Errors" data={props.newRelicCliErrors} riseIsBad threshold={1} />
      </div>
      <div className="col-xs-12 col-sm-6 col-md-3">
        <Breakdown heading="Error Breakdown" data={props.newRelicErrorBreakdown} />
      </div>
      <div className="col-xs-12 col-sm-6 col-md-3">
        <Funnel heading="Website Funnel" data={props.newRelicWebsiteFunnel} />
      </div>
      <div className="col-xs-12 col-sm-6 col-md-3">
        <Number heading="In Progress" data={props.jiraInProgress} riseIsBad threshold={10} />
      </div>
      <div className="col-xs-12 col-sm-6 col-md-3">
        <Number heading="Selected For Development" data={props.jiraSelectedForDevelopment} />
      </div>
      <div className="col-xs-12 col-sm-6 col-md-3">
        <Number heading="Ready For QA" data={props.jiraReadyForQa} />
      </div>
      <div className="col-xs-12 col-sm-6 col-md-3">
        <Trivia heading="Trivia" data={props.trivia} />
      </div>

      <div className="col-xs-12">
        <BugsHistory />
      </div>

      <div className="col-xs-12">
        <h2>Custom Widget Samples</h2>
      </div>

      <div className="col-xs-12 col-sm-6 col-md-3">
        <Number heading="Custom Number" data={props.customNumber} riseIsBad threshold={5} />
      </div>
      <div className="col-xs-12 col-sm-6 col-md-3">
        <Breakdown heading="Custom Breakdown" data={props.customBreakdown} />
      </div>
      <div className="col-xs-12 col-sm-6 col-md-3">
        <Funnel heading="Custom Funnel" data={props.customFunnel} />
      </div>
    </div>
  </div>;

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

/* eslint-disable react/forbid-prop-types */
WidgetList.propTypes = {
  newRelicErrors: PropTypes.object.isRequired,
  newRelicLoadTime: PropTypes.object.isRequired,
  newRelicUniqueSessions: PropTypes.object.isRequired,
  newRelicSuccessfulBookings: PropTypes.object.isRequired,
  newRelicCliErrors: PropTypes.object.isRequired,
  weekNumber: PropTypes.object.isRequired,
  newRelicErrorBreakdown: PropTypes.object.isRequired,
  jiraInProgress: PropTypes.object.isRequired,
  jiraSelectedForDevelopment: PropTypes.object.isRequired,
  jiraReadyForQa: PropTypes.object.isRequired,
  customNumber: PropTypes.object.isRequired,
  newRelicWebsiteFunnel: PropTypes.object.isRequired,
  customFunnel: PropTypes.object.isRequired,
  customBreakdown: PropTypes.object.isRequired,
  trivia: PropTypes.object.isRequired,
};

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
