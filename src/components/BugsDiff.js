import React from 'react';
import { connect } from 'react-redux';

const BugsDiff = ({lastWeek, thisWeek}) => (
  <div className="BugsDiff widget">
    <div className="BugsDiff-title widget-title">Bugs</div>
    <div className="BugsDiff-text">{thisWeek} / {lastWeek}</div>
  </div>
);

const mapStateToProps = (state) => ({
  lastWeek: state.bugsDiff.lastWeek,
  thisWeek: state.bugsDiff.thisWeek,
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(BugsDiff);
