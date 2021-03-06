import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { DragSource, DropTarget } from 'react-dnd';

import formatter from '../../../lib/formatter';
import ErrorHandler from '../../../components/ErrorHandler/ErrorHandler';
import VerticalBarChart from '../../../components/VerticalBarChart/VerticalBarChart';
import BasicTable from '../../../components/BasicTable/BasicTable';
import { dragSource, dropTarget, draggingStyle } from '../../../lib/draggable';
import constants from '../../../config/constants';
import iconHandler from '../../../lib/iconHandler';

const getKeyValuePairs = results => results.map(el => ({ key: el.name, value: el.count }));
const getTableData = results => results.map(el => [el.name, el.count]);

const Breakdown = ({ connectDragSource, connectDragPreview, connectDropTarget, isDragging, isOver, ...props }) =>
  compose(connectDragSource, connectDropTarget)(
    <div className="panel Breakdown" style={draggingStyle(isDragging, isOver)}>
      {connectDragPreview(
        <div className="panel-heading">
          <div className="panel-title-text">{props.heading}</div>
          {iconHandler.getIconPartial(props.iconType)}
        </div>,
      )}
      <div className="panel-body hidden-xs">
        <ErrorHandler {...props.response}>
          <div className="row">
            {props.data.results && <VerticalBarChart data={getKeyValuePairs(props.data.results)} />}
          </div>
        </ErrorHandler>
      </div>
      <div className="panel-body visible-xs-block">
        <ErrorHandler {...props.response}>
          {props.data.results && <BasicTable data={getTableData(props.data.results)} />}
        </ErrorHandler>
      </div>
      <div className="panel-footer">
        {props.description || props.data.description}
        {formatter.formatWidgetUpdatedTimestamp(props.data.updated)}
      </div>
    </div>,
  );

Breakdown.defaultProps = {
  iconType: null,
  description: null,
  results: [],
};

Breakdown.propTypes = {
  heading: PropTypes.string.isRequired,
  description: PropTypes.string,
  iconType: PropTypes.string,
  data: PropTypes.shape({
    results: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
      }),
    ),
    description: PropTypes.string,
  }).isRequired,
};

export default compose(
  DragSource(constants.draggableType.smallWidget, dragSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  })),
  DropTarget(constants.draggableType.smallWidget, dropTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  })),
)(Breakdown);
