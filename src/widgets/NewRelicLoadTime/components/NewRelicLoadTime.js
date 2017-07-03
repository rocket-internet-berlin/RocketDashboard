import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const NewRelicLoadTime = ({ current }) =>
  <div className="panel">
    <div className="panel-heading">Load Time</div>
    <div className="panel-body">
      <span className="this-week number-big">
        {current}
      </span>
    </div>
  </div>;

const mapStateToProps = state => ({
  current: state.newRelicLoadTime.current,
});

NewRelicLoadTime.propTypes = {
  current: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(NewRelicLoadTime);

// Note: PureNewRelicLoadTime is NewRelicLoadTime without redux (for unit tests)
export { NewRelicLoadTime as PureNewRelicLoadTime };
