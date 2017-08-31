import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Taken from https://github.com/nijk/react-fullscreen
 */
class FullScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullscreen: {},
      isFullscreenOn: false,
    };

    this.assignElement = this.assignElement.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.requestFullscreen = this.requestFullscreen.bind(this);
    this.handleScreenChange = this.handleScreenChange.bind(this);
  }

  componentDidMount() {
    if (this.props.active) {
      this.toggleFullscreen();
    }
  }

  getFullscreenProps() {
    if (!this.element) {
      console.warn('Target element not found, cannot provide fullscreen');
      return null;
    }

    if (this.element.webkitRequestFullscreen && !!document.webkitExitFullscreen) {
      return {
        element: 'webkitFullscreenElement',
        enabled: 'webkitFullscreenEnabled',
        exit: 'webkitExitFullscreen',
        request: 'webkitRequestFullscreen',
        onfullscreenchange: 'onwebkitfullscreenchange',
      };
    }

    if (this.element.mozRequestFullScreen && !!document.mozCancelFullScreen) {
      return {
        element: 'mozFullScreenElement',
        enabled: 'mozFullScreenEnabled',
        exit: 'mozCancelFullScreen',
        request: 'mozRequestFullScreen',
        onfullscreenchange: 'onmozfullscreenchange',
      };
    }

    if (this.element.msRequestFullscreen && !!document.msExitFullscreen) {
      return {
        element: 'msFullscreenElement',
        enabled: 'msFullscreenEnabled',
        exit: 'msExitFullscreen',
        request: 'msRequestFullscreen',
        onfullscreenchange: 'onmsfullscreenchange',
      };
    }

    if (this.element.requestFullscreen && !!document.exitFullscreen) {
      return {
        element: 'fullscreenElement',
        enabled: 'fullscreenEnabled',
        exit: 'exitFullscreen',
        request: 'requestFullscreen',
        onfullscreenchange: 'onfullscreenchange',
      };
    }

    console.warn(
      'Browser does not appear to support Fullscreen API. See https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API',
      this.state.fullscreen,
    );
    return null;
  }

  assignElement(elem) {
    this.element = elem;
    const fullscreen = this.getFullscreenProps();

    if (fullscreen) {
      // Re-render on change, e.g keyup 'esc' in global scope
      document[fullscreen.onfullscreenchange] = e => this.handleScreenChange(e);

      this.setState({ fullscreen });
    }
  }

  isFullscreen() {
    return this.state.fullscreen && !!document[this.state.fullscreen.element];
  }

  handleScreenChange() {
    if (!this.isFullscreen()) {
      this.props.handleExitFullScreen();
    }
  }

  requestFullscreen() {
    const { enabled, request } = this.state.fullscreen;

    if (document[enabled]) {
      this.element[request]();
    } else {
      console.warn('Fullscreen functionality is not enabled');
    }
  }

  cancelFullscreen() {
    if (this.isFullscreen()) {
      document[this.state.fullscreen.exit]();
    }
  }

  toggleFullscreen() {
    if (this.isFullscreen()) {
      this.cancelFullscreen();
    } else {
      this.requestFullscreen();
    }
  }

  render() {
    if (this.props.active) {
      this.requestFullscreen();
    } else {
      this.cancelFullscreen();
    }

    return (
      <div ref={this.assignElement} allowFullScreen>
        {this.props.children}
      </div>
    );
  }
}

FullScreen.propTypes = {
  children: PropTypes.element.isRequired,
  active: PropTypes.bool,
  handleExitFullScreen: PropTypes.func.isRequired,
};

FullScreen.defaultProps = {
  active: false,
};

export default FullScreen;
