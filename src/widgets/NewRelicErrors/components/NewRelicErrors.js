import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Number from '../../../../src/components/Number/Number';

const NewRelicErrors = ({ previous, current }) =>
  <Number title="Transaction Errors" current={current} previous={previous} />;

const mapStateToProps = state => ({
  previous: state.newRelicErrors.previous,
  current: state.newRelicErrors.current,
});

NewRelicErrors.propTypes = {
  previous: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(NewRelicErrors);

// Note: PureNewRelicErrors is NewRelicErrors without redux (for unit tests)
export { NewRelicErrors as PureNewRelicErrors };
