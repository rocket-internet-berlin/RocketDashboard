import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import './HorizontalBarChart.scss';

const HorizontalBarChart = ({ data }) =>
  <div className="HorizontalBarChart">
    <ResponsiveContainer width="100%" height={160}>
      <BarChart data={data}>
        <Bar dataKey="value" label={{ fontSize: 28 }} />
        <XAxis dataKey="key" type="category" />
        <YAxis dataKey="value" type="number" />
        <Tooltip />
      </BarChart>
    </ResponsiveContainer>
  </div>;

HorizontalBarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.isRequired,
      value: PropTypes.isRequired,
    }),
  ).isRequired,
};

export default HorizontalBarChart;
