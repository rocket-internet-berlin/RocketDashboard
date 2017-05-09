import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const BugsDiff = ({ lastWeek, thisWeek }) => (
  <div className="panel panel-primary">
    <div className="panel-heading">Bugs</div>
    <div className="panel-body widget-body">{thisWeek} / {lastWeek}</div>
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
