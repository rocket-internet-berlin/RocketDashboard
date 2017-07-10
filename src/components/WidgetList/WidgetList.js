import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './WidgetList.scss';
import Number from '../../widgets/Number/components/Number';
import BugsHistory from '../../widgets/BugsHistory/components/BugsHistory';
import JiraIssues from '../../widgets/JiraIssues/components/JiraIssues';
import NewRelicErrorBreakdown from '../../widgets/NewRelicErrorBreakdown/components/NewRelicErrorBreakdown';
import NewRelicWebsiteFunnel from '../../widgets/NewRelicWebsiteFunnel/components/NewRelicWebsiteFunnel';

const WidgetList = props =>
  <div className="WidgetList">
    <div className="row">
      <div className="col-xs-12 col-sm-3">
        <Number title="Week" data={props.weekNumber} />
      </div>
      <div className="col-xs-12 col-sm-3">
        <Number title="Load Time" data={props.newRelicLoadTime} />
      </div>
      <div className="col-xs-12 col-sm-3">
        <Number title="Transaction Errors" data={props.newRelicErrors} />
      </div>
      <div className="col-xs-12 col-sm-3">
        <Number title="Unique Sessions" data={props.newRelicUniqueSessions} />
      </div>
      <div className="col-xs-12 col-sm-3">
        <Number title="Successful Bookings" data={props.newRelicSuccessfulBookings} />
      </div>
      <div className="col-xs-12 col-sm-3">
        <Number title="CLI Errors" data={props.newRelicCliErrors} />
      </div>
      <div className="col-xs-12 col-sm-3">
        <JiraIssues />
      </div>
      <div className="col-xs-12 col-sm-4">
        <NewRelicErrorBreakdown />
      </div>
      <div className="col-xs-12 col-sm-4">
        <NewRelicWebsiteFunnel />
      </div>
      <div className="col-xs-12">
        <BugsHistory />
      </div>
    </div>
  </div>;

const mapStateToProps = state => ({
  weekNumber: state.number.weekNumber,
  newRelicLoadTime: state.number.newRelicLoadTime,
  newRelicErrors: state.number.newRelicErrors,
  newRelicUniqueSessions: state.number.newRelicUniqueSessions,
  newRelicSuccessfulBookings: state.number.newRelicSuccessfulBookings,
  newRelicCliErrors: state.number.newRelicCliErrors,
});

/* eslint-disable react/forbid-prop-types */
WidgetList.propTypes = {
  newRelicErrors: PropTypes.object.isRequired,
  newRelicLoadTime: PropTypes.object.isRequired,
  newRelicUniqueSessions: PropTypes.object.isRequired,
  newRelicSuccessfulBookings: PropTypes.object.isRequired,
  newRelicCliErrors: PropTypes.object.isRequired,
  weekNumber: PropTypes.object.isRequired,
};

WidgetList.defaultProps = {
  newRelicErrors: {},
  newRelicLoadTime: {},
  newRelicUniqueSessions: {},
  newRelicSuccessfulBookings: {},
  newRelicCliErrors: {},
  weekNumber: {},
};

export default connect(mapStateToProps)(WidgetList);
