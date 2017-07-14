import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import VerticalBarChart from '../../../components/VerticalBarChart/VerticalBarChart';
import BasicTable from '../../../components/BasicTable/BasicTable';

const getKeyValuePairs = data => data.map(el => ({ key: el.name, value: el.count }));
const getTableData = data => data.map(el => [el.name, el.count]);

const NewRelicErrorBreakdown = ({ data, description }) =>
  <div className="panel NewRelicErrorBreakdown">
    <div className="panel-heading">Error Breakdown</div>
    <div className="panel-body hidden-xs">
      <div className="row">
        <VerticalBarChart data={getKeyValuePairs(data)} />
      </div>
    </div>
    <div className="panel-body visible-xs-block">
      <BasicTable data={getTableData(data)} />
    </div>
    <div className="panel-footer">
      {description}
    </div>
  </div>;

const mapStateToProps = state => ({
  data: state.newRelicErrorBreakdown,
});

NewRelicErrorBreakdown.defaultProps = {
  description: null,
};

NewRelicErrorBreakdown.propTypes = {
  description: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default connect(mapStateToProps)(NewRelicErrorBreakdown);
