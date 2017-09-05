import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { DragSource, DropTarget } from 'react-dnd';

import { timeFormatter } from '../../../lib/formatter';
import getIcon from '../../../lib/getIcon';
import { dragSource, dropTarget, draggingStyle } from '../../../lib/draggable';
import constants from '../../../config/constants';
import './Text.scss';

const createRawHtml = rawText => ({
  __html: rawText,
});

const getClassNames = widgetName => `panel Text ${widgetName}`;

const Text = ({ connectDragSource, connectDropTarget, isDragging, isOver, ...props }) =>
  compose(connectDragSource, connectDropTarget)(
    <div className={getClassNames(props.widgetName)} style={draggingStyle(isDragging, isOver)}>
      <div className="panel-heading">
        <div className="panel-title-text">{props.data.heading || props.heading}</div>
        {getIcon(props.iconType)}
      </div>
      <div className="panel-body">
        {/* eslint-disable react/no-danger */}
        <div dangerouslySetInnerHTML={createRawHtml(props.data.body)} />
      </div>
      <div className="panel-footer">{timeFormatter(props.data.updated)}</div>
    </div>,
  );

Text.propTypes = {
  data: PropTypes.shape({
    body: PropTypes.string,
  }),
  heading: PropTypes.string,
  iconType: PropTypes.string,
  widgetName: PropTypes.string,
};

Text.defaultProps = {
  data: {
    body: null,
  },
  heading: null,
  iconType: null,
  widgetName: null,
};

export default compose(
  DragSource(constants.draggableType.smallWidget, dragSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  })),
  DropTarget(constants.draggableType.smallWidget, dropTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  })),
)(Text);
