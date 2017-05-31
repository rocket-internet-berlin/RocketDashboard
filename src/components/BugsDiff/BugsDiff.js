import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './BugsDiff.scss';

const BugsDiff = ({ lastWeek, thisWeek }) => (
  <div className="panel">
    <div className="panel-heading">Bugs Difference</div>
    <div className="panel-body">
      <span className="this-week number-big">{thisWeek}</span>
      <span className="last-week number-normal"> / {lastWeek}</span>
    </div>
  </div>
);

const mapStateToProps = state => ({
  lastWeek: state.bugsDiff.lastWeek,
  thisWeek: state.bugsDiff.thisWeek,
});

BugsDiff.propTypes = {
  thisWeek: PropTypes.number.isRequired,
  lastWeek: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(BugsDiff);

// Note: PureBugsDiff is BugsDiff without redux (for unit tests)
export { BugsDiff as PureBugsDiff };
