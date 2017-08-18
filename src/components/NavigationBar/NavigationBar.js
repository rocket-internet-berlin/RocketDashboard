/* eslint-disable jsx-a11y/href-no-hash */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { refreshAll } from '../../actions';
import './NavigationBar.scss';
import logo from './Images/logo.png';

export class NavigationBar extends Component {
  handleRefresh = () => {
    this.props.refreshAll();
  };

  render() {
    return (
      <nav className="NavigationBar navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <img className="navbar-brand" src={logo} alt="Logo" />
          </div>
          <div className="navbar-left">RocketDashboard</div>
          <div className="navbar-right">
            <ul className="nav navbar-nav">
              <li className="active">
                <button className="NavigationBar__refresh btn btn-default navbar-btn" onClick={this.handleRefresh}>
                  Refresh
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  state,
});

const mapDispatchToProps = {
  refreshAll,
};

NavigationBar.propTypes = {
  refreshAll: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
