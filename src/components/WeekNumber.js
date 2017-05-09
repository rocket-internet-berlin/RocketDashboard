import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const WeekNumber = ({ week }) => (
  <div className="panel panel-primary">
    <div className="panel-heading">Week</div>
    <div className="panel-body widget-body">
      {week}
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
