import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './WidgetList.scss';
import Number from '../../widgets/Number/components/Number';
import BugsHistory from '../../widgets/BugsHistory/components/BugsHistory';
import JiraIssues from '../../widgets/JiraIssues/components/JiraIssues';

const WidgetList = props =>
  <div className="WidgetList container-fluid">
    <div className="row">
      <div className="col-xs-12 col-sm-4">
        <Number title="Week" data={props.weekNumber} />
      </div>
      <div className="col-xs-12 col-sm-4">
        <Number title="Load Time" data={props.newRelicLoadTime} />
      </div>
      <div className="col-xs-12 col-sm-4">
        <Number title="Transaction Errors" data={props.newRelicErrors} />
      </div>
      <div className="col-xs-12 col-sm-4">
        <Number title="Unique Sessions" data={props.newRelicUniqueSessions} />
      </div>
      <div className="col-xs-12 col-sm-4">
        <Number title="Success Bookings" data={props.newRelicSuccessBookings} />
      </div>
      <div className="col-xs-12 col-sm-4">
        <Number title="CLI Errors" data={props.newRelicCLIErrors} />
      </div>
      <div className="col-xs-12 col-sm-4">
        <JiraIssues />
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
  newRelicSuccessBookings: state.number.newRelicSuccessBookings,
  newRelicCLIErrors: state.number.newRelicCLIErrors,
});

/* eslint-disable react/forbid-prop-types */
WidgetList.propTypes = {
  newRelicErrors: PropTypes.object.isRequired,
  newRelicLoadTime: PropTypes.object.isRequired,
  newRelicUniqueSessions: PropTypes.object.isRequired,
  newRelicSuccessBookings: PropTypes.object.isRequired,
  newRelicCLIErrors: PropTypes.object.isRequired,
  weekNumber: PropTypes.object.isRequired,
};

WidgetList.defaultProps = {
  newRelicErrors: {},
  newRelicLoadTime: {},
  newRelicUniqueSessions: {},
  newRelicSuccessBookings: {},
  newRelicCLIErrors: {},
  weekNumber: {},
};

export default connect(mapStateToProps)(WidgetList);
