import React from 'react';
import PropTypes from 'prop-types';

import './ErrorHandler.scss';

export const Error = props => (
  <div className="error-wrapper">
    <div>{props.message}</div>
  </div>
);

Error.propTypes = {
  message: PropTypes.string,
};

Error.defaultProps = {
  status: null,
  message: null,
  error: null,
};

const isError = response => {
  if (response.error || response.status === 'error') {
    return true;
  }

  return false;
};

const ErrorHandler = props => {
  if (isError(props)) {
    return <Error {...props} />;
  }

  return props.children;
};

ErrorHandler.propTypes = {
  children: PropTypes.element,
};

ErrorHandler.defaultProps = {
  children: null,
};

export default ErrorHandler;
