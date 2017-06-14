import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './NewRelicErrors.scss';

const NewRelicErrors = ({ lastWeek, thisWeek }) => (
  <div className="panel">
    <div className="panel-heading">New Relic Errors</div>
    <div className="panel-body">
      <span className="this-week number-big">{thisWeek}</span>
      <span className="last-week number-normal"> / {lastWeek}</span>
    </div>
  </div>
);

const mapStateToProps = state => ({
  lastWeek: state.newRelicErrors.lastWeek,
  thisWeek: state.newRelicErrors.thisWeek,
});

NewRelicErrors.propTypes = {
  thisWeek: PropTypes.number.isRequired,
  lastWeek: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(NewRelicErrors);

// Note: PureNewRelicErrors is NewRelicErrors without redux (for unit tests)
export { NewRelicErrors as PureNewRelicErrors };
