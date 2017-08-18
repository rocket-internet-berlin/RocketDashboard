import React from 'react';
import PropTypes from 'prop-types';
import _round from 'lodash/round';

import constants from '../../../config/constants';
import './Number.scss';

const getRounded = decimal => _round(decimal, 2);
const formatChange = decimal => {
  if (isFinite(decimal)) {
    return `${_round(decimal, 2)}%`;
  }
  return 'Infinity';
};

const getChange = (current, previous) => {
  // https://ux.stackexchange.com/questions/60902/displaying-percentage-difference-from-zero
  if (current > 0 && previous === 0) {
    return Infinity;
  } else if (current === 0 && previous === 0) {
    return 0;
  }
  return (current - previous) / previous * 100;
};

const getChangeClassName = (number, riseIsBad) => {
  if (number < 0) {
    return riseIsBad ? 'change decrease good' : 'change decrease bad';
  } else if (number > 0) {
    return riseIsBad ? 'change increase bad' : 'change increase good';
  }
  return 'change';
};

const getCurrentClassName = (current, threshold, riseIsBad) => {
  if (current === null || current === 'undefined' || current === constants.unknown) {
    return constants.loading;
  }

  const isBadAndAboveThreshold = riseIsBad && current >= threshold;
  const isGoodAndBelowThreshold = !riseIsBad && current <= threshold;
  if (threshold && (isBadAndAboveThreshold || isGoodAndBelowThreshold)) {
    return 'current threshold-overcome';
  }
  return 'current';
};

const getFormattedData = current => {
  if (current === constants.unknown) {
    return current;
  } else if (current === null || current === 'undefined') {
    return constants.loadingData;
  }

  return getRounded(current);
};

const Number = ({ heading, description, data, riseIsBad, threshold }) =>
  <div className="Number panel">
    <div className="panel-heading">
      {heading}
    </div>
    <div className="panel-body">
      <span className={getCurrentClassName(data.current, threshold, riseIsBad)}>
        {getFormattedData(data.current)}
      </span>
      {typeof data.previous !== 'undefined' &&
        data.previous !== constants.unknown &&
        <span className={getChangeClassName(getChange(data.current, data.previous), riseIsBad)}>
          {formatChange(getChange(data.current, data.previous))}
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
    current: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
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
    current: null,
    previous: null,
    description: null,
  },
};

export default Number;
