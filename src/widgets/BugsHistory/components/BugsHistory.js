import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import BasicTable from '../../../components/BasicTable/BasicTable';

import './BugsHistory.scss';

const getTableDataFromHistory = data => data.map(item => [item.date, item.openBugs, item.solvedBugs, item.newBugs]);

const BugsHistory = ({ history, description }) =>
  <div className="panel BugsHistory">
    <div className="panel-heading">Bugs History</div>
    <div className="panel-body hidden-xs">
      <div className="row">
        <ResponsiveContainer width="100%" height={220}>
          <LineChart margin={{ top: 0, right: 45, left: 0, bottom: 0 }} data={history}>
            <Line
              type="linear"
              dataKey="openBugs"
              name="Open"
              barSize={10}
              strokeWidth="1"
              dot={{ stroke: '#1986ff', strokeWidth: 1, r: 6 }}
              stroke="#1986ff"
            />
            <Line
              type="linear"
              dataKey="solvedBugs"
              name="Solved"
              barSize={10}
              strokeWidth="1"
              dot={{ stroke: '#9BB209', strokeWidth: 1, r: 6 }}
              stroke="#9BB209"
            />
            <Line
              type="linear"
              dataKey="newBugs"
              name="New"
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
      <BasicTable data={getTableDataFromHistory(history)} headings={['Date', 'Open Bugs', 'Solved Bugs', 'New Bugs']} />
    </div>
    <div className="panel-footer">
      {description}
    </div>
  </div>;

const mapStateToProps = state => ({
  history: state.bugsHistory.history,
});

BugsHistory.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      openBugs: PropTypes.number.isRequired,
      solvedBugs: PropTypes.number.isRequired,
      newBugs: PropTypes.number.isRequired,
    }),
  ).isRequired,
  description: PropTypes.string,
};

BugsHistory.defaultProps = {
  description: null,
};

export default connect(mapStateToProps)(BugsHistory);
