import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import WidgetItem from './WidgetItem';
import { toggleDisplay } from './actions/widgetSettings';

export const WidgetListItems = props => {
  const handleChangeDisplay = e => {
    props.toggleDisplay({ id: e.target.id });
    e.stopPropagation();
  };

  return (
    <ul>
      {props.widgetList.map(widget =>
        <WidgetItem key={widget.key} widget={widget} handleClick={handleChangeDisplay} />,
      )}
    </ul>
  );
};

const mapStateToProps = state => ({
  state,
});

const mapDispatchToProps = {
  toggleDisplay,
};

WidgetListItems.propTypes = {
  widgetList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WidgetListItems);
