/* eslint-disable jsx-a11y/href-no-hash */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { refreshAll, increment, decrement } from '../../actions';
import './NavigationBar.scss';

class NavigationBar extends Component {
  handleIncrement = () => {
    this.props.increment(1);
  };

  handleDecrement = () => {
    this.props.decrement(1);
  };

  handleRefresh = () => {
    this.props.refreshAll();
  };

  render() {
    return (
      <nav className="NavigationBar navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <div className="navbar-brand">RocketDashboard</div>
          </div>
          <ul className="nav navbar-nav navbar-right">
            <li className="active">
              <button
                className="NavigationBar__refresh btn btn-default navbar-btn"
                onClick={this.handleIncrement}
              >
                increment
              </button>
              {}
              <button
                className="NavigationBar__refresh btn btn-default navbar-btn"
                onClick={this.handleDecrement}
              >
                decrement
              </button>

              [{this.props.counter}]

              <button
                className="NavigationBar__refresh btn btn-default navbar-btn"
                onClick={this.handleRefresh}
              >
                Refresh
              </button>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  state,
  counter: state.valueChangeReducer.counter,
});

const mapDispatchToProps = {
  refreshAll,
  increment,
  decrement,
};

NavigationBar.propTypes = {
  refreshAll: PropTypes.func.isRequired,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
