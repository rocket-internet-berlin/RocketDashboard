import React from 'react';
import PropTypes from 'prop-types';
import _round from 'lodash/round';
import './Number.scss';

const getRounded = decimal => _round(decimal, 2);
const getChange = (current, previous) => {
  // https://ux.stackexchange.com/questions/60902/displaying-percentage-difference-from-zero
  if (current > 0 && previous === 0) {
    return current * 100;
  } else if (current === 0 && previous === 0) {
    return 0;
  }
  return (current - previous) / previous * 100;
};

const getChangeIcon = number => {
  if (number < 0) {
    return <i className="fa fa-arrow-down" />;
  } else if (number > 0) {
    return <i className="fa fa-arrow-up" />;
  }
  return <i className="fa fa-arrow-right" />;
};

const Number = ({ title, data }) =>
  <div className="Number panel">
    <div className="panel-heading">
      {title}
    </div>
    <div className="panel-body">
      <span className="current">
        {getRounded(data.current)}
      </span>
      {typeof data.previous !== 'undefined' &&
        <span className="change">
          {getChangeIcon(getChange(data.current, data.previous))}
          {getRounded(getChange(data.current, data.previous))}%
        </span>}
    </div>
  </div>;

Number.propTypes = {
  title: PropTypes.string,
  data: PropTypes.shape({
    current: PropTypes.number,
    previous: PropTypes.number,
  }),
};

Number.defaultProps = {
  title: '',
  data: {
    current: 0,
    previous: null,
  },
};

export default Number;
