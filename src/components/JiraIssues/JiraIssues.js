/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ResponsiveContainer, BarChart, Bar } from 'recharts';

import './JiraIssues.scss';

const JiraIssues = ({ blockers, criticals, others }) => (
  <div className="panel JiraIssues">
    <div className="panel-heading">Jira Issues</div>
    <div className="panel-body">
      <div className="row">
        <ResponsiveContainer width="100%" height={190}>
          <BarChart
            width="100%"
            height="100%"
            data={[{ blockers, criticals, others }]}
          >
            <Bar
              dataKey="blockers"
              fill="#ff2b19"
              label={{ fill: '#ff2b19', fontSize: 28 }}
            />
            <Bar
              dataKey="criticals"
              fill="#ff796e"
              label={{ fill: '#ff796e', fontSize: 28 }}
            />
            <Bar
              dataKey="others"
              fill="#ffb8b2"
              label={{ fill: '#ffb8b2', fontSize: 28 }}
            />
          </BarChart>
        </ResponsiveContainer>
        <div className="labels-container">
          <div className="label label-blockers">blockers</div>
          <div className="label label-criticals">criticals</div>
          <div className="label label-others">others</div>
        </div>
      </div>
    </div>
  </div>
);

const mapStateToProps = state => ({
  blockers: state.jiraIssues.blockers,
  criticals: state.jiraIssues.criticals,
  others: state.jiraIssues.others,
});

JiraIssues.propTypes = {
  blockers: PropTypes.number.isRequired,
  criticals: PropTypes.number.isRequired,
  others: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(JiraIssues);
