import React from 'react';
import PropTypes from 'prop-types';
import RelativeTime from 'react-relative-time';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import BasicTable from '../../../components/BasicTable/BasicTable';
import getIcon from '../../../lib/getIcon';

export const getTableData = data => data.map(el => [el.name, el.count]);
export const fixSilhouette = value => Math.abs(value * 2);

const updatedTime = updated => {
  if (updated) {
    return (
      <em className="pull-right">
        <RelativeTime value={updated} titleFormat="YYYY/MM/DD HH:mm" />
      </em>
    );
  }
  return null;
};

const Funnel = ({ heading, iconType, data, description }) =>
  <div className="panel NewRelicWebsiteFunnel">
    <div className="panel-heading">
      {heading}
      {getIcon(iconType)}
    </div>
    <div className="panel-body hidden-xs">
      <div className="row">
        <ResponsiveContainer width="100%" height={165}>
          <AreaChart
            data={data.results}
            layout="vertical"
            width={600}
            height={165}
            stackOffset="silhouette"
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <XAxis tickFormatter={fixSilhouette} type="number" stroke="#b7b7b7" fill="#b7b7b7" />
            <YAxis width={140} dataKey="name" type="category" stroke="#b7b7b7" fill="#b7b7b7" />
            <Tooltip />
            <Area type="monotone" dataKey="count" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
    <div className="panel-body visible-xs-block">
      {data.results && <BasicTable data={getTableData(data.results)} />}
    </div>
    <div className="panel-footer">
      {description || data.description}
      {updatedTime(data.updated)}
    </div>
  </div>;

Funnel.defaultProps = {
  iconType: null,
  description: null,
};

Funnel.propTypes = {
  heading: PropTypes.string.isRequired,
  iconType: PropTypes.string,
  description: PropTypes.string,
  data: PropTypes.shape({
    results: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
      }),
    ),
    description: PropTypes.string,
  }).isRequired,
};

export default Funnel;
