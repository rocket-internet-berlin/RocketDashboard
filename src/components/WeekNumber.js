import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const WeekNumber = ({ aNumber }) => (

  <div className="WeekNumber widget">
    <div className="WeekNumber-title widget-title">Week</div>
    <div className="WeekNumber-number widget-number">{aNumber}</div>
  </div>

);

const mapStateToProps = (state) => ({
  aNumber: state.weekNumber.aNumber,
});

WeekNumber.propTypes = {
  aNumber: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(WeekNumber);
