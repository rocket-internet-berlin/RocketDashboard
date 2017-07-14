import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './WidgetList.scss';
import Number from '../../widgets/Number/components/Number';
import BugsHistory from '../../widgets/BugsHistory/components/BugsHistory';
import NewRelicErrorBreakdown from '../../widgets/NewRelicErrorBreakdown/components/NewRelicErrorBreakdown';
import NewRelicWebsiteFunnel from '../../widgets/NewRelicWebsiteFunnel/components/NewRelicWebsiteFunnel';

const WidgetList = props =>
  <div className="WidgetList">
    <div className="row">
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
        <NewRelicErrorBreakdown />
      </div>
      <div className="col-xs-12 col-sm-6 col-md-3">
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
