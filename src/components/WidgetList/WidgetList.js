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
      <div className="col-xs-12 col-sm-6 col-md-3">
        <Number heading="Week" data={props.weekNumber} />
      </div>
      <div className="col-xs-12 col-sm-6 col-md-3">
        <Number
          heading="Load Time (s)"
          explain="since 10 minutes ago"
          data={props.newRelicLoadTime}
          riseIsBad
          threshold={0.33}
        />
      </div>
      <div className="col-xs-12 col-sm-6 col-md-3">
        <Number
          heading="Transaction Errors"
          explain="since 30 minutes ago compare with 30 minutes ago"
          data={props.newRelicErrors}
          riseIsBad
          threshold={1}
        />
      </div>
      <div className="col-xs-12 col-sm-6 col-md-3">
        <Number
          heading="Unique Sessions"
          explain="since 20 minutes ago compare with 20 minutes ago"
          data={props.newRelicUniqueSessions}
        />
      </div>
      <div className="col-xs-12 col-sm-6 col-md-3">
        <Number
          heading="Successful Bookings"
          explain="since 1 day ago compare with 1 day ago"
          data={props.newRelicSuccessfulBookings}
        />
      </div>
      <div className="col-xs-12 col-sm-6 col-md-3">
        <Number
          heading="CLI Errors"
          explain="since 30 minutes ago"
          data={props.newRelicCliErrors}
          riseIsBad
          threshold={1}
        />
      </div>
      <div className="col-xs-12 col-sm-6 col-md-3">
        <JiraIssues />
      </div>
      <div className="col-xs-12 col-sm-6 col-md-3">
        <NewRelicErrorBreakdown explain="since 1 day ago" />
      </div>
      <div className="col-xs-12 col-sm-6 col-md-3">
        <NewRelicWebsiteFunnel explain="since 1 day ago" />
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
