import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import VerticalBarChart from '../../../components/VerticalBarChart/VerticalBarChart';
import BasicTable from '../../../components/BasicTable/BasicTable';

const getKeyValuePairs = errors => errors.map(el => ({ key: el.name, value: el.count }));
const getTableData = errors => errors.map(el => [el.name, el.count]);

const NewRelicErrorBreakdown = ({ errors }) =>
  <div className="panel NewRelicErrorBreakdown">
    <div className="panel-heading">Error Breakdown</div>
    <div className="panel-body hidden-xs">
      <div className="row">
        <VerticalBarChart data={getKeyValuePairs(errors)} />
      </div>
    </div>
    <div className="panel-body visible-xs-block">
      <BasicTable data={getTableData(errors)} />
    </div>
  </div>;

const mapStateToProps = state => ({
  errors: state.newRelicErrorBreakdown,
});

NewRelicErrorBreakdown.propTypes = PropTypes.arrayOf(
  PropTypes.shape({
    name: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
  }),
).isRequired;

export default connect(mapStateToProps)(NewRelicErrorBreakdown);
