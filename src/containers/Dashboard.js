import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WidgetList from '../components/WidgetList';
import Button from '../components/Button';
import { refreshAll } from '../actions';

class Dashboard extends Component {

  componentDidMount() {
    this.props.refreshAll();
  }

  handleRefresh = () => {
    this.props.refreshAll();
  }

  render() {
    return (
      <div className="App container">
        <Button label="Refresh" onClick={this.handleRefresh} />
        <WidgetList />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = {
  refreshAll,
};

Dashboard.propTypes = {
  refreshAll: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
