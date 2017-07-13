import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import './VerticalBarChart.scss';

/* eslint-disable react/prop-types */
const CustomizedAxisTick = ({ x, y, payload }) =>
  <g transform={`translate(${x},${y})`}>
    <text x="10" y="-10" dy="0" textAnchor="start" fill="#b7b7b7">
      {payload.value}
    </text>
  </g>;

const VerticalBarChart = ({ data }) =>
  <ResponsiveContainer width="100%" height={195}>
    <BarChart
      className="VerticalBarChart"
      layout="vertical"
      width={600}
      height={195}
      data={data}
      margin={{ top: 0, right: 20, bottom: 0, left: -40 }}
    >
      <XAxis type="number" hide />
      <YAxis dataKey="key" type="category" tick={<CustomizedAxisTick />} />
      <Tooltip />
      <Bar legendType="line" dataKey="value" barSize={15} fill="#1986ff" label={{ fill: '#1986ff' }} />
    </BarChart>
  </ResponsiveContainer>;

VerticalBarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.isRequired,
      value: PropTypes.isRequired,
    }),
  ).isRequired,
};

export default VerticalBarChart;
