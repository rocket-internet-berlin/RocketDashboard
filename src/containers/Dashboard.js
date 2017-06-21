import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import WidgetList from '../components/WidgetList/WidgetList';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import './Dashboard.scss';
import { refreshAll, autoRefreshStart } from '../actions';

class Dashboard extends Component {
  componentDidMount() {
    this.props.refreshAll();
    this.props.autoRefreshStart();
  }

  render() {
    return (
      <div className="Dashboard">
        <NavigationBar />
        <WidgetList />
      </div>
    );
  }
}

const mapDispatchToProps = {
  refreshAll,
  autoRefreshStart,
};

Dashboard.propTypes = {
  refreshAll: PropTypes.func.isRequired,
  autoRefreshStart: PropTypes.func.isRequired,
};

export default connect(state => state, mapDispatchToProps)(Dashboard);
