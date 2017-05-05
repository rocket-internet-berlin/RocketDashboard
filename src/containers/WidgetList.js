import React, { Component } from 'react';
import { connect } from 'react-redux';
import WeekNumber from '../components/WeekNumber';
import BugsDiff from '../components/BugsDiff';

class WidgetList extends Component {

  render() {
    return (
      <div className="container">
        <WeekNumber />
        <BugsDiff lastWeek="10" thisWeek="12" />
      </div>
    );
  }

}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(WidgetList);
