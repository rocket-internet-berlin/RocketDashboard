import React from 'react';
import PropTypes from 'prop-types';
import _round from 'lodash/round';
import './Number.scss';

const getRounded = decimal => _round(decimal, 2);
const getChange = (current, previous) => {
  // https://ux.stackexchange.com/questions/60902/displaying-percentage-difference-from-zero
  if (current > 0 && previous === 0) {
    return 100;
  } else if (current === 0 && previous === 0) {
    return 0;
  }
  return (current - previous) / previous * 100;
};

const getChangeClassName = (number, riseIsBad) => {
  if (number < 0) {
    return riseIsBad ? 'change decrease positive' : 'change decrease negative';
  } else if (number > 0) {
    return riseIsBad ? 'change increase negative' : 'change increase positive';
  }
  return 'change';
};

const getCurrentClassName = (current, threshold, riseIsBad) => {
  if (threshold && ((riseIsBad && current >= threshold) || (!riseIsBad && current <= threshold))) {
    return 'current threshold-overcome';
  }
  return 'current';
};

const Number = ({ title, data, riseIsBad, threshold }) =>
  <div className="Number panel">
    <div className="panel-heading">
      {title}
    </div>
    <div className="panel-body">
      <span className={getCurrentClassName(data.current, threshold, riseIsBad)}>
        {getRounded(data.current)}
      </span>
      {typeof data.previous !== 'undefined' &&
        <span className={getChangeClassName(getChange(data.current, data.previous), riseIsBad)}>
          {getRounded(getChange(data.current, data.previous))}%
        </span>}
    </div>
  </div>;

Number.propTypes = {
  title: PropTypes.string.isRequired,
  riseIsBad: PropTypes.bool,
  threshold: PropTypes.number,
  data: PropTypes.shape({
    current: PropTypes.number.isRequired,
    previous: PropTypes.number,
  }),
};

Number.defaultProps = {
  title: '',
  riseIsBad: false,
  threshold: null,
  data: {
    current: 0,
    previous: null,
  },
};

export default Number;
