import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import BasicTable from '../../../components/BasicTable/BasicTable';

const getTableData = data => data.map(el => [el.name, el.count]);
const fixSilhouette = value => Math.abs(value * 2);

const NewRelicWebsiteFunnel = ({ data, explain }) =>
  <div className="panel NewRelicWebsiteFunnel">
    <div className="panel-heading">Website Funnel</div>
    <div className="panel-body hidden-xs">
      <div className="row">
        <ResponsiveContainer width="100%" height={165}>
          <AreaChart
            data={data}
            layout="vertical"
            width={600}
            height={165}
            stackOffset="silhouette"
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <XAxis tickFormatter={fixSilhouette} type="number" />
            <YAxis width={140} dataKey="name" type="category" />
            <Tooltip />
            <Area type="monotone" dataKey="count" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
    <div className="panel-body visible-xs-block">
      <BasicTable data={getTableData(data)} />
    </div>
    <div className="panel-footer">
      {explain}
    </div>
  </div>;

const mapStateToProps = state => ({
  data: state.newRelicWebsiteFunnel,
});

NewRelicWebsiteFunnel.defaultProps = {
  explain: null,
};

NewRelicWebsiteFunnel.propTypes = {
  explain: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default connect(mapStateToProps)(NewRelicWebsiteFunnel);
