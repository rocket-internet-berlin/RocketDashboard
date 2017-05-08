import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const WeekNumber = ({ week }) => (

  <div className="WeekNumber widget">
    <div className="WeekNumber-title widget-title">Week</div>
    <div className="WeekNumber-number widget-number">{week}</div>
  </div>

);

const mapStateToProps = (state) => ({
  week: state.weekNumber.week,
});

WeekNumber.propTypes = {
  week: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(WeekNumber);
