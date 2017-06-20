/* eslint-disable react/prop-types */
import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

import './JiraIssues.scss';

const data = [
  { name: 'Blokers', value: 3 },
  { name: 'Criticals', value: 5 },
  { name: 'Others', value: 10 },
];

const COLORS = ['#1986ff', '#7fbcff', '#e5f1ff'];

const JiraIssues = () => (
  <div className="panel JiraIssues">
    <div className="panel-heading">Jira Issues</div>
    <div className="panel-body hidden-xs">
      <div className="row">
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data}
                isAnimationActive={false}
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
              >
                {data.map((entry, index) => <Cell fill={COLORS[index]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="blockers-number">
            {data.length > 0 ? data[0].value : 0}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default JiraIssues;
