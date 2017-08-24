import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RelativeTime from 'react-relative-time';
import { compose } from 'redux';
import { DragSource, DropTarget } from 'react-dnd';

import { dragSource, dropTarget, draggingStyle } from '../../../lib/draggable';
import constants from '../../../config/constants';
import getIcon from '../../../lib/getIcon';

const updatedTime = updated => {
  if (updated) {
    return (
      <em className="pull-right">
        <RelativeTime value={updated} titleFormat="YYYY/MM/DD HH:mm" />
      </em>
    );
  }
  return null;
};

const getChangeSection = change => {
  let classNames = 'change decrease bad';

  if (change > 0) {
    classNames = 'change increase good';
  }

  return (
    <span className={classNames}>
      {change}
    </span>
  );
};

const Finance = ({ connectDragSource, connectDropTarget, isDragging, isOver, ...props }) =>
  compose(connectDragSource, connectDropTarget)(
    <div className="panel Number" style={draggingStyle(isDragging, isOver)}>
      <div className="panel-heading">
        {props.finance.finance.company}
        Stock Price
        {getIcon(props.iconType)}
      </div>
      <div className="panel-body">
        <span className="current">
          {props.finance.finance.price}
        </span>
      </div>
      <div className="panel-footer">
        {getChangeSection(props.finance.finance.change)}
        {updatedTime(props.finance.finance.updated)}
      </div>
    </div>,
  );

const mapStateToProps = state => ({
  finance: state.finance,
});

Finance.propTypes = {
  finance: PropTypes.shape({
    change: PropTypes.number,
    price: PropTypes.number,
    updated: PropTypes.string,
    company: PropTypes.string,
  }).isRequired,
  iconType: PropTypes.string,
};

Finance.defaultProps = {
  finance: {},
  iconType: null,
};

export default compose(
  DragSource(constants.draggableType.smallWidget, dragSource, (conn, monitor) => ({
    connectDragSource: conn.dragSource(),
    isDragging: monitor.isDragging(),
  })),
  DropTarget(constants.draggableType.smallWidget, dropTarget, (conn, monitor) => ({
    connectDropTarget: conn.dropTarget(),
    isOver: monitor.isOver(),
  })),
  connect(mapStateToProps),
)(Finance);
