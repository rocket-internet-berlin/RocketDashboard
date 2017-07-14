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
  const isBadAndAboveThreshold = riseIsBad && current >= threshold;
  const isGoodAndBelowThreshold = !riseIsBad && current <= threshold;
  if (threshold && (isBadAndAboveThreshold || isGoodAndBelowThreshold)) {
    return 'current threshold-overcome';
  }
  return 'current';
};

const Number = ({ heading, description, data, riseIsBad, threshold }) =>
  <div className="Number panel">
    <div className="panel-heading">
      {heading}
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
    <div className="panel-footer">
      {description || data.description}
    </div>
  </div>;

Number.propTypes = {
  heading: PropTypes.string.isRequired,
  riseIsBad: PropTypes.bool,
  threshold: PropTypes.number,
  description: PropTypes.string,
  data: PropTypes.shape({
    current: PropTypes.number,
    previous: PropTypes.number,
    description: PropTypes.string,
  }),
};

Number.defaultProps = {
  heading: '',
  description: null,
  riseIsBad: false,
  threshold: null,
  data: {
    current: 0,
    previous: null,
    description: null,
  },
};

export default Number;
