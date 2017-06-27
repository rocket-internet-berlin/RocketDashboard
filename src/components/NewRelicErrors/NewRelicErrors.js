import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './NewRelicErrors.scss';

const NewRelicErrors = ({ previous, current }) => (
  <div className="panel">
    <div className="panel-heading">New Relic Errors</div>
    <div className="panel-body">
      <span className="this-week number-big">{current}</span>
      <span className="last-week number-normal"> / {previous}</span>
    </div>
  </div>
);

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
