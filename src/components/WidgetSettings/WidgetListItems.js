/* eslint-disable jsx-a11y/no-static-element-interactions, no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import forEach from 'lodash/forEach';

import WidgetItem from './WidgetItem';
import { toggleDisplay, showWidget, hideWidget } from './actions/widgetSettings';

export const WidgetListItems = props => {
  const handleChangeDisplay = e => {
    props.toggleDisplay({ id: e.target.id });
    e.stopPropagation();
  };

  const isAllSelected = () => {
    let allSelected = true;

    forEach(props.widgetList, widget => {
      if (!widget.display) {
        allSelected = false;
        return false;
      }

      return true;
    });

    return allSelected;
  };

  const toggleSelectAll = () => {
    const allSelected = isAllSelected();

    forEach(props.widgetList, widget => {
      if (allSelected) {
        props.hideWidget({ id: widget.id });
      } else {
        props.showWidget({ id: widget.id });
      }
    });
  };

  return (
    <ul>
      <li>
        <input type="checkbox" checked={isAllSelected()} onChange={() => toggleSelectAll()} />
        <label htmlFor="checkbox" onClick={() => toggleSelectAll()}>
          Select all
        </label>
      </li>
      <hr />
      {props.widgetList.map(widget => (
        <WidgetItem key={widget.key} widget={widget} handleClick={handleChangeDisplay} />
      ))}
    </ul>
  );
};

const mapStateToProps = state => ({
  state,
});

const mapDispatchToProps = {
  toggleDisplay,
  showWidget,
  hideWidget,
};

WidgetListItems.propTypes = {
  widgetList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WidgetListItems);
