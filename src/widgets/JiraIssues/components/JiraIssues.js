/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import HorizontalBarChart from '../../../components/HorizontalBarChart/HorizontalBarChart';

import './JiraIssues.scss';

const JiraIssues = ({ data }) =>
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
  </div>;

const mapStateToProps = state => ({
  data: [
    {
      key: 'blockers',
      value: 3,
    },
    {
      key: 'criticals',
      value: 2,
    },
    {
      key: 'others',
      value: 1,
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
};

export default connect(mapStateToProps)(JiraIssues);
