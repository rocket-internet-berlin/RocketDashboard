import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { compose } from 'redux';
import { DragSource, DropTarget } from 'react-dnd';

import ErrorHandler from '../../../components/ErrorHandler/ErrorHandler';
import formatter from '../../../lib/formatter';
import iconHandler from '../../../lib/iconHandler';
import BasicTable from '../../../components/BasicTable/BasicTable';
import CustomizedAxisTick from './CustomizedAxisTick';
import './History.scss';
import { dragSource, dropTarget, draggingStyle } from '../../../lib/draggable';
import constants from '../../../config/constants';

const getTableDataFromHistory = data => data.map(item => [item.date, item.openBugs, item.solvedBugs, item.newBugs]);

const History = ({ connectDragSource, connectDragPreview, connectDropTarget, isDragging, isOver, ...props }) =>
  compose(connectDragSource, connectDropTarget)(
    <div className="panel History" style={draggingStyle(isDragging, isOver)}>
      {connectDragPreview(
        <div className="panel-heading">
          <div className="panel-title-text">{props.heading}</div>
          {iconHandler.getIconPartial(props.iconType)}
        </div>,
      )}
      <div className="panel-body hidden-xs">
        <div className="row">
          <ErrorHandler {...props.response}>
            <ResponsiveContainer width="100%" height="100%" minHeight={200}>
              <LineChart margin={{ top: 0, right: 45, left: 0, bottom: 0 }} data={props.data.history}>
                {props.legends.map(legend => (
                  <Line
                    key={legend.dataKey}
                    type="linear"
                    dataKey={legend.dataKey}
                    name={legend.name}
                    barSize={10}
                    strokeWidth="1"
                    dot={props.dots === false ? false : { stroke: legend.color, strokeWidth: 1, r: 6 }}
                    stroke={legend.color}
                  />
                ))}
                <CartesianGrid stroke="#e7e7e7" strokeDasharray="2 4" />
                <XAxis
                  dataKey="date"
                  stroke={constants.chartColor.tickColor}
                  tickSize={10}
                  height={70}
                  tick={<CustomizedAxisTick />}
                />
                <YAxis stroke={constants.chartColor.tickColor} tickSize={10} padding={{ top: 20 }} />
                <Tooltip />
                <Legend />
              </LineChart>
            </ResponsiveContainer>
          </ErrorHandler>
        </div>
      </div>
      <div className="panel-body visible-xs-block">
        <ErrorHandler {...props.response}>
          {props.data.history && (
            <BasicTable
              data={getTableDataFromHistory(props.data.history)}
              headings={['Date', 'Open Bugs', 'Solved Bugs', 'New Bugs']}
            />
          )}
        </ErrorHandler>
      </div>
      <div className="panel-footer">
        {props.description}
        {formatter.formatWidgetUpdatedTimestamp(props.data.updated)}
      </div>
    </div>,
  );

History.propTypes = {
  data: PropTypes.shape({
    history: PropTypes.arrayOf(PropTypes.object),
    status: PropTypes.string,
    error: PropTypes.string,
  }).isRequired,
  description: PropTypes.string,
  iconType: PropTypes.string,
  legends: PropTypes.arrayOf(PropTypes.object),
};

History.defaultProps = {
  description: null,
  iconType: null,
  updated: null,
};

export default compose(
  DragSource(constants.draggableType.smallWidget, dragSource, (conn, monitor) => ({
    connectDragSource: conn.dragSource(),
    connectDragPreview: conn.dragPreview(),
    isDragging: monitor.isDragging(),
  })),
  DropTarget(constants.draggableType.smallWidget, dropTarget, (conn, monitor) => ({
    connectDropTarget: conn.dropTarget(),
    isOver: monitor.isOver(),
  })),
)(History);
