import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Number from '../../../../src/components/Number/Number';

const NewRelicLoadTime = ({ current }) => <Number title="Load Time" current={current} />;

const mapStateToProps = state => ({
  current: state.newRelicLoadTime.current,
});

NewRelicLoadTime.propTypes = {
  current: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(NewRelicLoadTime);

// Note: PureNewRelicLoadTime is NewRelicLoadTime without redux (for unit tests)
export { NewRelicLoadTime as PureNewRelicLoadTime };
