import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const BugsHistory = ({ history, period }) => (
  <div className="panel panel-primary">
    <div className="panel-heading">Bugs History ({period})</div>
    <div className="panel-body widget-body">
      <ResponsiveContainer width="100%" aspect={3}>
        <LineChart
          margin={{ top: 30, right: 15, left: 0, bottom: 15 }}
          data={history}
        >
          <Line
            type="linear"
            dataKey="bugs"
            barSize={40}
            strokeWidth="2"
            stroke="#ff9c00"
          />
          <CartesianGrid stroke="#e7e7e7" strokeDasharray="2 4" />
          <XAxis dataKey="label" stroke="#777" tickSize={10} />
          <YAxis stroke="#777" tickSize={10} />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const mapStateToProps = state => ({
  history: state.bugsHistory.history,
  period: state.bugsHistory.period,
});

BugsHistory.propTypes = {
  history: PropTypes.arrayOf(
    React.PropTypes.shape({
      label: React.PropTypes.string.isRequired,
      bugs: React.PropTypes.number.isRequired,
    }),
  ).isRequired,
  period: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(BugsHistory);
