import React from 'react';

const CustomizedAxisTick = props => {
  const { x, y, stroke, payload } = props; // eslint-disable-line

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="end" fill="#b7b7b7" transform="rotate(-35)">
        {payload.value}
      </text>
    </g>
  );
};

export default CustomizedAxisTick;
