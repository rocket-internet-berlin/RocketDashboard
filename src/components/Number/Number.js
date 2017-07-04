import React from 'react';
import PropTypes from 'prop-types';
import './Number.scss';

const Number = ({ title, current, previous }) =>
  <div className="Number panel">
    <div className="panel-heading">
      {title}
    </div>
    <div className="panel-body">
      <span className="this-week number-big">
        {current}
      </span>
      {previous &&
        <span className="last-week number-normal">
          / {previous}
        </span>}
    </div>
  </div>;

Number.propTypes = {
  title: PropTypes.string.isRequired,
  current: PropTypes.number.isRequired,
  previous: PropTypes.number,
};

Number.defaultProps = {
  previous: null,
};

export default Number;
