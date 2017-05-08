import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const WeekNumber = ({ weeknumber }) => (

  <div className="WeekNumber widget">
    <div className="WeekNumber-title widget-title">Week</div>
    <div className="WeekNumber-number widget-number">{weeknumber}</div>
  </div>

);

const mapStateToProps = (state) => ({
  weeknumber: state.weekNumber,
});

WeekNumber.propTypes = {
  weeknumber: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(WeekNumber);
