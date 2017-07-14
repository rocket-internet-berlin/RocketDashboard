import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import './VerticalBarChart.scss';

const VerticalBarChart = ({ data }) =>
  <div className="VerticalBarChart">
    <ResponsiveContainer width="100%" height={155}>
      <BarChart
        layout="vertical"
        width={600}
        height={155}
        data={data}
        margin={{ top: 0, right: 40, bottom: 0, left: -40 }}
      >
        <XAxis type="number" hide />
        <YAxis dataKey="key" type="category" tick={<CustomizedAxisTick />} />
        <Tooltip />
        <Bar legendType="line" dataKey="value" barSize={15} label={{ fontSize: 20 }} />
      </BarChart>
    </ResponsiveContainer>
  </div>;

VerticalBarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.isRequired,
      value: PropTypes.isRequired,
    }),
  ).isRequired,
};

const CustomizedAxisTick = ({ x, y, payload }) =>
  <g transform={`translate(${x},${y})`}>
    <text x="10" y="-10" dy="0" textAnchor="start" fill="#b7b7b7">
      {payload.value}
    </text>
  </g>;

CustomizedAxisTick.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  payload: PropTypes.shape({
    value: PropTypes.isRequired,
  }),
};

CustomizedAxisTick.defaultProps = {
  x: 0,
  y: 0,
  payload: {
    value: '',
  },
};

export default VerticalBarChart;
