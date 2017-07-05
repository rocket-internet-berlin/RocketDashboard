import React from 'react';
import PropTypes from 'prop-types';
import _round from 'lodash/round';
import './Number.scss';

const getRounded = decimal => _round(decimal, 2);
const getChange = (current, previous) => (previous === 0 ? previous : (current - previous) / previous * 100);
const getPreviousClass = number => {
  const changeClass = number < 0 ? 'negativ' : 'positiv';
  return `previous ${changeClass}`;
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
        <span className={getPreviousClass(getChange(data.current, data.previous))}>
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
