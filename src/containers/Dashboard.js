import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import ReactInterval from 'react-interval';
import WidgetList from '../components/WidgetList/WidgetList';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import './Dashboard.scss';
import { refreshAll } from '../actions';

class Dashboard extends Component {
  componentDidMount() {
    this.props.refreshAll();
  }

  render() {
    return (
      <div className="Dashboard">
        <NavigationBar />
        <WidgetList />
        <ReactInterval
          timeout={1000 * 60}
          enabled
          callback={this.props.refreshAll}
        />
      </div>
    );
  }
}

const mapDispatchToProps = {
  refreshAll,
};

Dashboard.propTypes = {
  refreshAll: PropTypes.func.isRequired,
};

export default connect(state => state, mapDispatchToProps)(Dashboard);
