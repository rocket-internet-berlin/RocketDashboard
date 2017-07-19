import React from 'react';
import PropTypes from 'prop-types';
import VerticalBarChart from '../../../components/VerticalBarChart/VerticalBarChart';
import BasicTable from '../../../components/BasicTable/BasicTable';

const getKeyValuePairs = results => results.map(el => ({ key: el.name, value: el.count }));
const getTableData = results => results.map(el => [el.name, el.count]);

const Breakdown = ({ heading, data, description }) =>
  <div className="panel Breakdown">
    <div className="panel-heading">
      {heading}
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
    </div>
  </div>;

Breakdown.defaultProps = {
  description: null,
  results: [],
};

Breakdown.propTypes = {
  heading: PropTypes.string.isRequired,
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

export default Breakdown;
