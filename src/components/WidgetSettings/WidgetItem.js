/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const WidgetItem = props => {
  const widget = props.widget;

  return (
    <li>
      <input type="checkbox" id={widget.id} checked={widget.display} onChange={props.handleClick} />
      <label htmlFor="checkbox" id={widget.id} onClick={props.handleClick}>
        {widget.heading ? widget.heading : widget.key}
      </label>
    </li>
  );
};

const mapStateToProps = state => ({
  state,
});

WidgetItem.propTypes = {
  widget: PropTypes.shape({
    id: PropTypes.string,
    key: PropTypes.string,
    display: PropTypes.bool,
    heading: PropTypes.string,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WidgetItem);
