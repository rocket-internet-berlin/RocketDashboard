/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HorizontalBarChart from '../../../components/HorizontalBarChart/HorizontalBarChart';

import './JiraIssues.scss';

const JiraIssues = ({ data, description }) =>
  <div className="panel JiraIssues">
    <div className="panel-heading">Jira Issues</div>
    <div className="panel-body">
      <div className="row">
        <HorizontalBarChart data={data} />
        <div className="labels-container">
          <div className="label label-blockers">Blockers</div>
          <div className="label label-criticals">Criticals</div>
          <div className="label label-others">Others</div>
        </div>
      </div>
    </div>
    <div className="panel-footer">
      {description}
    </div>
  </div>;

const mapStateToProps = state => ({
  data: [
    {
      key: 'blockers',
      value: state.jiraIssues.blockers,
    },
    {
      key: 'criticals',
      value: state.jiraIssues.criticals,
    },
    {
      key: 'others',
      value: state.jiraIssues.others,
    },
  ],
});

JiraIssues.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.isRequired,
      value: PropTypes.isRequired,
    }),
  ).isRequired,
  description: PropTypes.string,
};

JiraIssues.defaultProps = {
  description: null,
};

export default connect(mapStateToProps)(JiraIssues);
