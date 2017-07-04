import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Number from '../../../../src/components/Number/Number';

const WeekNumber = ({ week }) => <Number title="Week" current={week} />;

const mapStateToProps = state => ({
  week: state.weekNumber.week,
});

WeekNumber.propTypes = {
  week: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(WeekNumber);

// Note: PureWeekNumber is WeekNumber without redux (for unit tests)
export { WeekNumber as PureWeekNumber };
