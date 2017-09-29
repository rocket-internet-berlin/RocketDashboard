import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { DragSource, DropTarget } from 'react-dnd';

import formatter from '../../../lib/formatter';
import { dragSource, dropTarget, draggingStyle } from '../../../lib/draggable';
import constants from '../../../config/constants';
import iconHandler from '../../../lib/iconHandler';
import './Instagram.scss';

const instaImage = (thumbnail, standardResolution) => {
  if (!thumbnail || !standardResolution) {
    return null;
  }
  return ({
    background: `url(${standardResolution}) no-repeat center center`,
    '-webkit-background-size': 'cover',
    '-moz-background-size': 'cover',
    '-o-background-size': 'cover',
    'background-size': 'cover',
  });
};

const Instagram = ({ connectDragSource, connectDropTarget, isDragging, isOver, iconType, instagram }) =>
  compose(connectDragSource, connectDropTarget)(
    <div className="panel Instagram" style={draggingStyle(isDragging, isOver)}>
      <div className="panel-heading">
        <div className="panel-title-text">
          InstaFeed {instagram.instagram.username}
        </div>
        {iconHandler.getIconPartial(iconType)}
      </div>
      <div className="panel-body" style={instaImage(instagram.instagram.thumbnail, instagram.instagram.standardResolution)} />
      <div className="panel-footer">
        <span>
          {formatter.formatWidgetUpdatedTimestamp(instagram.instagram.updated)}
        </span>
      </div>
    </div>,
  );

const mapStateToProps = state => ({
  instagram: state.instagram,
});

Instagram.propTypes = {
  instagram: PropTypes.shape({
    username: PropTypes.string,
    thumbnail: PropTypes.string,
    standardResolution: PropTypes.string,
    updated: PropTypes.string,
  }).isRequired,
  iconType: PropTypes.string,
};

Instagram.defaultProps = {
  instagram: {
    username: null,
    thumbnail: null,
    standardResolution: null,
    updated: null,
  },
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
)(Instagram);
