/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Number.scss';

const Number = ({ title, dataKey, numberState }) =>
  <div className="Number panel">
    <div className="panel-heading">
      {title}
    </div>
    <div className="panel-body">
      <span className="this-week number-big">
        {numberState[dataKey].current}
      </span>
      {numberState[dataKey].previous &&
        <span className="last-week number-normal">
          / {numberState[dataKey].previous}
        </span>}
    </div>
  </div>;

const mapStateToProps = state => ({
  numberState: state.number,
});

Number.propTypes = {
  title: PropTypes.string.isRequired,
  dataKey: PropTypes.string.isRequired,
  numberState: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(Number);
