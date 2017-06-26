/* eslint-disable react/prop-types */
import React from 'react';
import { ResponsiveContainer, BarChart, Bar } from 'recharts';

import './JiraIssues.scss';

const data = [{ blockers: 3, criticals: 5, others: 10 }];

const JiraIssues = () => (
  <div className="panel JiraIssues">
    <div className="panel-heading">Jira Issues</div>
    <div className="panel-body hidden-xs">
      <div className="row">
        <ResponsiveContainer width="100%" height={190}>
          <BarChart width="100%" height="100%" data={data}>
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

export default JiraIssues;
