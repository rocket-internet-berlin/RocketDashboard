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
import BasicTable from '../BasicTable/BasicTable';

import './BugsHistory.scss';

const BugsHistory = ({ history, period }) => (
  <div className="panel panel--bugshistory">
    <div className="panel-heading">Bugs History ({period})</div>
    <div className="panel-body widget-body hidden-xs">
      <div className="row">
        <div className="col-sm-8">
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                margin={{ top: 30, right: 15, left: 0, bottom: 15 }}
                data={history}
              >
                <Line
                  type="linear"
                  dataKey="bugs"
                  barSize={40}
                  strokeWidth="2"
                  stroke="#1986FF"
                />
                <CartesianGrid stroke="#e7e7e7" strokeDasharray="2 4" />
                <XAxis dataKey="label" stroke="#777" tickSize={10} />
                <YAxis stroke="#777" tickSize={10} />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="col-sm-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width="35"
            height="35"
          >
            <g fill="#1986ff">
              <path d="M379.1 306.9h109.8c6.8 0 12.3-5.5 12.3-12.3s-5.5-12.3-12.3-12.3H379.1v-30h25.3c23.8 0 43.2-19.4 43.2-43.2v-44.7c0-6.8-5.5-12.3-12.3-12.3s-12.3 5.5-12.3 12.3v44.7c0 10.3-8.4 18.7-18.7 18.7h-25.4c-1.3-24.8-21.9-44.7-47-44.7H180.1c-25.2 0-45.7 19.8-47 44.7h-25.4c-10.3 0-18.7-8.4-18.7-18.7v-44.7c0-6.8-5.5-12.3-12.3-12.3s-12.3 5.5-12.3 12.3v44.7c0 23.8 19.4 43.2 43.2 43.2h25.3v30H23.1c-6.8 0-12.3 5.5-12.3 12.3s5.5 12.3 12.3 12.3h109.8v20.6c0 3.1.2 6.1.4 9.1h-25.7c-23.8 0-43.2 19.4-43.2 43.2v44.7c0 6.8 5.5 12.3 12.3 12.3S89 431.3 89 424.5v-44.7c0-10.3 8.4-18.7 18.7-18.7H138c14.4 46.9 58.1 81.1 109.6 81.1h16.8c51.5 0 95.2-34.2 109.6-81.1h30.3c10.3 0 18.7 8.4 18.7 18.7v44.7c0 6.8 5.5 12.3 12.3 12.3s12.3-5.5 12.3-12.3v-44.7c0-23.8-19.4-43.2-43.2-43.2h-25.7c.2-3 .4-6 .4-9.1v-20.6zm-221.7 20.7v-97.1c0-12.5 10.2-22.7 22.7-22.7h63.6v209.8c-47.9-2.1-86.3-41.6-86.3-90zm110.9 89.9V207.8h63.6c12.5 0 22.7 10.2 22.7 22.7v97.1c0 48.4-38.4 87.9-86.3 89.9z" />
              <path d="M177.9 147.9c0 6.8 5.5 12.3 12.3 12.3 6.8 0 12.3-5.5 12.3-12.3 0-29.6 24-53.6 53.6-53.6s53.6 24 53.6 53.6c0 6.8 5.5 12.3 12.3 12.3s12.3-5.5 12.3-12.3c0-43.1-35-78.1-78.1-78.1s-78.3 35-78.3 78.1z" />
            </g>
          </svg>
          <span className="bugs-current">10</span>
        </div>
      </div>
    </div>
    <div className="panel-body widget-body visible-xs-block">
      <BasicTable data={history} />
    </div>
  </div>
);

const mapStateToProps = state => ({
  history: state.bugsHistory.history,
  period: state.bugsHistory.period,
});

BugsHistory.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      bugs: PropTypes.number.isRequired,
    }),
  ).isRequired,
  period: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(BugsHistory);

// Note: PureBugsHistory is BugsHistory without redux (for unit tests)
export { BugsHistory as PureBugsHistory };
