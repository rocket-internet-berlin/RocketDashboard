import constants from '../config/constants';

/**
 * Common drag-and-drop related data
 */
export const dragSource = {
  beginDrag(props) {
    return {
      id: props.id,
    };
  },
};

export const dropTarget = {
  hover(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    const targetId = targetProps.id;
    const sourceId = sourceProps.id;

    if (sourceId !== targetId) {
      targetProps.onHover({ sourceId, targetId });
    }
  },

  drop(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    const targetId = targetProps.id;
    const sourceId = sourceProps.id;

    targetProps.onMove({ sourceId, targetId });
  },
};

export const draggingStyle = (isDragging, isOver) => ({
  opacity: isDragging || isOver ? constants.draggingOpacity : 1,
});
