import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './WidgetList.scss';
import Number from '../../components/Number/Number';
import BugsHistory from '../../widgets/BugsHistory/components/BugsHistory';
import JiraIssues from '../../widgets/JiraIssues/components/JiraIssues';

const WidgetList = props =>
  <div className="WidgetList container-fluid">
    <div className="row">
      <div className="col-xs-12 col-sm-4">
        <Number title="Week" data={props.weekNumber} />
      </div>
      <div className="col-xs-12 col-sm-4">
        <Number title="Load Time" data={props.newRelicLoadTime} />
      </div>
      <div className="col-xs-12 col-sm-4">
        <Number title="Transaction Errors" data={props.newRelicErrors} />
      </div>
      <div className="col-xs-12 col-sm-4">
        <JiraIssues />
      </div>
      <div className="col-xs-12">
        <BugsHistory />
      </div>
    </div>
  </div>;

const mapStateToProps = state => ({
  weekNumber: state.weekNumber,
  newRelicLoadTime: state.newRelicLoadTime,
  newRelicErrors: state.newRelicErrors,
});

/* eslint-disable react/forbid-prop-types */
WidgetList.propTypes = {
  newRelicErrors: PropTypes.object.isRequired,
  newRelicLoadTime: PropTypes.object.isRequired,
  weekNumber: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(WidgetList);
