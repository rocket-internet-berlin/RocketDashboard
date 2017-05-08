import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const BugsDiff = ({ lastWeek, thisWeek }) => (
  <div className="BugsDiff widget">
    <div className="BugsDiff-title widget-title">Bugs</div>
    <div className="BugsDiff-text">{thisWeek} / {lastWeek}</div>
  </div>
);

const mapStateToProps = (state) => ({
  lastWeek: state.bugsDiff.lastWeek,
  thisWeek: state.bugsDiff.thisWeek,
});

BugsDiff.propTypes = {
  thisWeek: PropTypes.number,
  lastWeek: PropTypes.number,
};

BugsDiff.defaultProps = {
  thisWeek: 0,
  lastWeek: 0,
};

export default connect(mapStateToProps)(BugsDiff);
