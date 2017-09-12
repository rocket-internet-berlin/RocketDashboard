import React from 'react';
import PropTypes from 'prop-types';
import _round from 'lodash/round';
import { compose } from 'redux';
import { DragSource, DropTarget } from 'react-dnd';

import ErrorHandler from '../../../components/ErrorHandler/ErrorHandler';
import formatter from '../../../lib/formatter';
import iconHandler from '../../../lib/iconHandler';
import constants from '../../../config/constants';
import { dragSource, dropTarget, draggingStyle } from '../../../lib/draggable';
import './Number.scss';

const getRounded = decimal => _round(decimal, 2);
const formatChange = decimal => {
  if (isFinite(decimal)) {
    return `${_round(decimal, 2)}%`;
  }
  return 'Infinity';
};

const getChange = (current, previous) => {
  // https://ux.stackexchange.com/questions/60902/displaying-percentage-difference-from-zero
  if (current > 0 && previous === 0) {
    return Infinity;
  } else if (current === 0 && previous === 0) {
    return 0;
  }
  return (current - previous) / previous * 100;
};

const getChangeClassName = (number, riseIsBad) => {
  if (number < 0) {
    return riseIsBad ? 'change decrease good' : 'change decrease bad';
  } else if (number > 0) {
    return riseIsBad ? 'change increase bad' : 'change increase good';
  }
  return 'change';
};

const getCurrentClassName = (current, threshold, riseIsBad) => {
  if (isNaN(current) || current === null) {
    return constants.loading;
  }

  const isBadAndAboveThreshold = riseIsBad && current >= threshold;
  const isGoodAndBelowThreshold = !riseIsBad && current <= threshold;
  if (threshold && (isBadAndAboveThreshold || isGoodAndBelowThreshold)) {
    return 'current threshold-overcome';
  }
  return 'current';
};

const getFormattedData = current => {
  if (current === constants.unknown) {
    return current;
  } else if (isNaN(current) || current === null) {
    return constants.loadingData;
  }

  return getRounded(current);
};

const Number = ({ connectDragSource, connectDropTarget, isDragging, isOver, ...props }) =>
  compose(connectDragSource, connectDropTarget)(
    <div className="Number panel" style={draggingStyle(isDragging, isOver)}>
      <div className="panel-heading">
        <div className="panel-title-text">{props.data.heading || props.heading}</div>
        {iconHandler.getIconPartial(props.iconType)}
      </div>
      <div className="panel-body">
        <ErrorHandler {...props.response}>
          <div className="body-wrapper">
            <span className={getCurrentClassName(props.data.current, props.threshold, props.riseIsBad)}>
              {props.formatter ? props.formatter(props.data.current) : getFormattedData(props.data.current)}
            </span>
            {!isNaN(props.data.previous) && (
              <span className={getChangeClassName(getChange(props.data.current, props.data.previous), props.riseIsBad)}>
                {formatChange(getChange(props.data.current, props.data.previous))}
              </span>
            )}
          </div>
        </ErrorHandler>
      </div>
      <div className="panel-footer">
        {props.description || props.data.description}
        {formatter.formatWidgetUpdatedTimestamp(props.data.updated)}
      </div>
    </div>,
  );

Number.propTypes = {
  heading: PropTypes.string.isRequired,
  iconType: PropTypes.string,
  riseIsBad: PropTypes.bool,
  threshold: PropTypes.number,
  description: PropTypes.string,
  formatter: PropTypes.func,
  data: PropTypes.shape({
    current: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    previous: PropTypes.number,
    description: PropTypes.string,
    updated: PropTypes.updated,
  }),
};

Number.defaultProps = {
  heading: '',
  iconType: null,
  description: null,
  riseIsBad: false,
  threshold: null,
  data: {
    current: null,
    previous: null,
    description: null,
    updated: null,
  },
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
)(Number);
