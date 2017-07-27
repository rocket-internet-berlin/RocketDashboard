import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import ReactInterval from 'react-interval';
import { refreshAll } from '../../actions';

// Use named export for unconnected component (for tests)
export class RefreshInterval extends Component {
  componentDidMount() {
    this.props.refreshAll();
  }

  render() {
    return <ReactInterval timeout={1000 * 60} enabled callback={this.props.refreshAll} />;
  }
}

const mapDispatchToProps = {
  refreshAll,
};

RefreshInterval.propTypes = {
  refreshAll: PropTypes.func.isRequired,
};

// Use default export for the connected component (for app)
export default connect(state => state, mapDispatchToProps)(RefreshInterval);
