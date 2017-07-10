import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import BasicTable from '../../../components/BasicTable/BasicTable';

/* eslint-disable react/prop-types */
const CustomizedAxisTick = ({ x, y, payload }) =>
  <g transform={`translate(${x},${y})`}>
    <text x="10" y="-10" dy="0" textAnchor="start" fill="#b7b7b7">
      {payload.value}
    </text>
  </g>;

const NewRelicErrorBreakdown = ({ errors }) =>
  <div className="panel NewRelicErrorBreakdown">
    <div className="panel-heading">Error Breakdown</div>
    <div className="panel-body hidden-xs">
      <div className="row">
        <ResponsiveContainer width="100%" height={195}>
          <BarChart
            layout="vertical"
            width={600}
            height={195}
            data={errors}
            margin={{ top: 0, right: 20, bottom: 0, left: -40 }}
          >
            <XAxis type="number" hide />
            <YAxis dataKey="name" type="category" tick={<CustomizedAxisTick />} />
            <Tooltip />
            <Bar legendType="line" dataKey="count" barSize={15} fill="#1986ff" label={{ fill: '#1986ff' }} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
    <div className="panel-body visible-xs-block">
      <BasicTable data={errors} />
    </div>
  </div>;

const mapStateToProps = state => ({
  errors: state.newRelicErrorBreakdown,
});

NewRelicErrorBreakdown.propTypes = PropTypes.arrayOf(
  PropTypes.shape({
    name: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
  }),
).isRequired;

export default connect(mapStateToProps)(NewRelicErrorBreakdown);
