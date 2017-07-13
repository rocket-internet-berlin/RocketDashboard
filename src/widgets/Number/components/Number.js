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

const getChangeClassName = (number, riseIsGood) => {
  if (number < 0) {
    return riseIsGood ? 'change decrease negative' : 'change decrease positive';
  } else if (number > 0) {
    return riseIsGood ? 'change increase positive' : 'change increase negative';
  }
  return 'change';
};

const Number = ({ title, data, riseIsGood }) =>
  <div className="Number panel">
    <div className="panel-heading">
      {title}
    </div>
    <div className="panel-body">
      <span className="current">
        {getRounded(data.current)}
      </span>
      {typeof data.previous !== 'undefined' &&
        <span className={getChangeClassName(getChange(data.current, data.previous), riseIsGood)}>
          {getRounded(getChange(data.current, data.previous))}%
        </span>}
    </div>
  </div>;

Number.propTypes = {
  title: PropTypes.string.isRequired,
  riseIsGood: PropTypes.bool,
  data: PropTypes.shape({
    current: PropTypes.number.isRequired,
    previous: PropTypes.number,
  }),
};

Number.defaultProps = {
  title: '',
  riseIsGood: true,
  data: {
    current: 0,
    previous: null,
  },
};

export default Number;
