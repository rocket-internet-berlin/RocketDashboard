import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import BasicTable from '../BasicTable/BasicTable';

import './BugsHistory.scss';

const BugsHistory = ({ history }) => (
  <div className="panel BugsHistory">
    <div className="panel-heading">Bugs History</div>
    <div className="panel-body hidden-xs">
      <div className="row">
        <ResponsiveContainer width="100%" height={320}>
          <LineChart
            margin={{ top: 30, right: 45, left: 0, bottom: 15 }}
            data={history}
          >
            <Line
              type="linear"
              dataKey="openBugs"
              barSize={10}
              strokeWidth="1"
              dot={{ stroke: '#1986ff', strokeWidth: 1, r: 6 }}
              stroke="#1986ff"
            />
            <Line
              type="linear"
              dataKey="solvedBugs"
              barSize={10}
              strokeWidth="1"
              dot={{ stroke: '#9BB209', strokeWidth: 1, r: 6 }}
              stroke="#9BB209"
            />
            <Line
              type="linear"
              dataKey="newBugs"
              barSize={10}
              strokeWidth="1"
              dot={{ stroke: '#FF2B19', strokeWidth: 1, r: 6 }}
              stroke="#FF2B19"
            />
            <CartesianGrid stroke="#e7e7e7" strokeDasharray="2 4" />
            <XAxis dataKey="date" stroke="#b7b7b7" tickSize={10} />
            <YAxis stroke="#b7b7b7" tickSize={10} />
            <Tooltip />
            <Legend />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
    <div className="panel-body visible-xs-block">
      <BasicTable data={history} />
    </div>
  </div>
);

const mapStateToProps = state => ({
  history: state.bugsHistory.history,
});

BugsHistory.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      bugs: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default connect(mapStateToProps)(BugsHistory);

// Note: PureBugsHistory is BugsHistory without redux (for unit tests)
export { BugsHistory as PureBugsHistory };
