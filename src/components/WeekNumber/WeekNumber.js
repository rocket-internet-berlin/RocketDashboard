import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './WeekNumber.scss';

const WeekNumber = ({ week }) => (
  <div className="WeekNumber panel">
    <div className="panel-heading">Week Number</div>
    <div className="panel-body widget-body">
      <span className="number-big">{week}</span>
    </div>
  </div>
);

const mapStateToProps = state => ({
  week: state.weekNumber.week,
});

WeekNumber.propTypes = {
  week: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(WeekNumber);

// Note: PureWeekNumber is WeekNumber without redux (for unit tests)
export { WeekNumber as PureWeekNumber };
