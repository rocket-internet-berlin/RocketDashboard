import React from 'react';
import { connect } from 'react-redux';

const WeekNumber = ({number}) => (
  <div className="WeekNumber widget">
    <div className="WeekNumber-title widget-title">Week</div>
    <div className="WeekNumber-number widget-number">{number}</div>
  </div>
);

const mapStateToProps = (state) => ({
  number: state.weekNumber.number,
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(WeekNumber);
