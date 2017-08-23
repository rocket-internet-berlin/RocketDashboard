import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { DragSource, DropTarget } from 'react-dnd';

import getIcon from '../../../lib/getIcon';
import './Trivia.scss';
import { dragSource, dropTarget, draggingStyle } from '../../../lib/draggable';
import constants from '../../../config/constants';

const Trivia = ({ connectDragSource, connectDropTarget, isDragging, isOver, ...props }) =>
  compose(connectDragSource, connectDropTarget)(
    <div className="panel Trivia" style={draggingStyle(isDragging, isOver)}>
      <div className="panel-heading">
        Date Trivia
        {getIcon(props.iconType)}
      </div>
      <div className="panel-body">
        <div>
          {props.data.trivia}
        </div>
      </div>
    </div>,
  );

Trivia.propTypes = {
  data: PropTypes.shape({
    trivia: PropTypes.string,
  }),
  iconType: PropTypes.string,
};

Trivia.defaultProps = {
  data: {
    trivia: null,
  },
  iconType: null,
};

// export default Trivia;
export default compose(
  DragSource(constants.draggableType.smallWidget, dragSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  })),
  DropTarget(constants.draggableType.smallWidget, dropTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  })),
)(Trivia);
