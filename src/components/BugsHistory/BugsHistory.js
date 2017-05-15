import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

const BugsHistory = () => (
  <div className="panel panel-primary">
    <div className="panel-heading">Bugs History</div>
    <div className="panel-body widget-body">
      <ResponsiveContainer width="100%" aspect={3}>
        <BarChart
          margin={{ top: 30, right: 15, left: 0, bottom: 15 }}
          data={data}
        >
          <Bar type="monotone" dataKey="uv" barSize={40} fill="#8884d8" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default BugsHistory;
