import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import VerticalBarChart from '../../../components/VerticalBarChart/VerticalBarChart';
import BasicTable from '../../../components/BasicTable/BasicTable';

const getKeyValuePairs = errors => errors.map(el => ({ key: el.name, value: el.count }));
const getTableData = errors => errors.map(el => [el.name, el.count]);

const NewRelicErrorBreakdown = ({ data, description }) =>
  <div className="panel NewRelicErrorBreakdown">
    <div className="panel-heading">Error Breakdown</div>
    <div className="panel-body hidden-xs">
      <div className="row">
        <VerticalBarChart data={getKeyValuePairs(data.errors)} />
      </div>
    </div>
    <div className="panel-body visible-xs-block">
      <BasicTable data={getTableData(data.errors)} />
    </div>
    <div className="panel-footer">
      {description || data.description}
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
  data: PropTypes.shape({
    errors: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
      }),
    ).isRequired,
    description: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps)(NewRelicErrorBreakdown);
