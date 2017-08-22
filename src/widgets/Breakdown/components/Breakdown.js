import React from 'react';
import PropTypes from 'prop-types';
import RelativeTime from 'react-relative-time';
import VerticalBarChart from '../../../components/VerticalBarChart/VerticalBarChart';
import BasicTable from '../../../components/BasicTable/BasicTable';
import getIcon from '../../../lib/getIcon';

const getKeyValuePairs = results => results.map(el => ({ key: el.name, value: el.count }));
const getTableData = results => results.map(el => [el.name, el.count]);

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

const Breakdown = ({ heading, iconType, data, description }) =>
  <div className="panel Breakdown">
    <div className="panel-heading">
      {heading}
      {getIcon(iconType)}
    </div>
    <div className="panel-body hidden-xs">
      <div className="row">
        {data.results && <VerticalBarChart data={getKeyValuePairs(data.results)} />}
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

Breakdown.defaultProps = {
  iconType: null,
  description: null,
  results: [],
};

Breakdown.propTypes = {
  heading: PropTypes.string.isRequired,
  description: PropTypes.string,
  iconType: PropTypes.string,
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

export default Breakdown;
