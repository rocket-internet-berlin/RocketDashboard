import React, { Component } from 'react';
import { connect } from 'react-redux';
import WeekNumber from '../components/WeekNumber';

class WidgetList extends Component {

  render() {
    return (
      <div className="container">
        <WeekNumber />
      </div>
    )
  }

}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(WidgetList);
