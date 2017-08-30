/* eslint-disable jsx-a11y/href-no-hash */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { refreshAll, showWidgetModal } from '../../actions';
import './NavigationBar.scss';
import logo from './Images/logo.png';

export class NavigationBar extends Component {
  handleRefresh = () => {
    this.props.refreshAll();
  };

  handleFullScreenMode = () => {
    this.props.enterFullScreenMode();
  };

  showModal = () => {
    this.props.showWidgetModal();
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
                <button
                  className="NavigationBar__fullscreen btn btn-default navbar-btn visible-md-inline visible-lg-inline"
                  onClick={this.handleFullScreenMode}
                >
                  {this.props.fullScreenMode ? 'Exit Full Screen' : 'Full Screen'}
                </button>
              </li>
              <li className="active">
                <button
                  className="NavigationBar__widget-settings btn btn-default navbar-btn hidden-xs"
                  onClick={this.showModal}
                >
                  Settings
                </button>
                {/* eslint-disable jsx-a11y/no-static-element-interactions */}
                <span className="visible-xs-inline icon fa-cog" onClick={this.showModal} />
              </li>
              <li className="active">
                <button
                  className="NavigationBar__refresh btn btn-default navbar-btn hidden-xs"
                  onClick={this.handleRefresh}
                >
                  Refresh
                </button>
                <span className="visible-xs-inline icon fa-refresh" onClick={this.handleRefresh} />
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
  showWidgetModal,
};

NavigationBar.propTypes = {
  refreshAll: PropTypes.func.isRequired,
  enterFullScreenMode: PropTypes.func.isRequired,
  fullScreenMode: PropTypes.bool.isRequired,
  showWidgetModal: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
