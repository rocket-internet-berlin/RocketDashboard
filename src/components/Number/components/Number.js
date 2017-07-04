import React from 'react';
import PropTypes from 'prop-types';
import './Number.scss';

const Number = ({ title, data }) =>
  <div className="Number panel">
    <div className="panel-heading">
      {title}
    </div>
    <div className="panel-body">
      <span className="this-week number-big">
        {data.current}
      </span>
      {data.previous &&
        <span className="last-week number-normal">
          / {data.previous}
        </span>}
    </div>
  </div>;

Number.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.shape({
    current: PropTypes.number.isRequired,
    previous: PropTypes.number,
  }),
};

Number.defaultProps = {
  data: {
    current: 0,
    previous: null,
  },
};

export default Number;
