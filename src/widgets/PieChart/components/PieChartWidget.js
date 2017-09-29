import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';
import { compose } from 'redux';
import { DragSource, DropTarget } from 'react-dnd';

import formatter from '../../../lib/formatter';
import BasicTable from '../../../components/BasicTable/BasicTable';
import { dragSource, dropTarget, draggingStyle } from '../../../lib/draggable';
import constants from '../../../config/constants';
import iconHandler from '../../../lib/iconHandler';
import './PieChartWidget.scss';

export const getTableData = data => data.map(el => [el.name, el.value]);
const COLORS = [constants.chartColor.red, constants.chartColor.blue, constants.chartColor.green];

const PieChartWidget = ({ connectDragSource, connectDragPreview, connectDropTarget, isDragging, isOver, ...props }) =>
  compose(connectDragSource, connectDropTarget)(
    <div className="panel Funnel PieChart" style={draggingStyle(isDragging, isOver)}>
      {connectDragPreview(
        <div className="panel-heading">
          <div className="panel-title-text">{props.heading}</div>
          {iconHandler.getIconPartial(props.iconType)}
        </div>,
      )}
      <div className="panel-body hidden-xs">
        <div className="row">
          {props.data.results && (
            <ResponsiveContainer width="100%" minHeight={155}>
              <PieChart width={600} height={165}>
                <Pie data={props.data.results} cx="70%" cy="55%" innerRadius="40%" outerRadius="60%" label>
                  {props.data.results.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout="vertical" align="left" verticalAlign="middle" margin={{ left: 10 }} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
      <div className="panel-body visible-xs-block">
        {props.data.results && <BasicTable data={getTableData(props.data.results)} />}
      </div>
      <div className="panel-footer">
        {props.description || props.data.description}
        {formatter.formatWidgetUpdatedTimestamp(props.data.updated)}
      </div>
    </div>,
  );

PieChartWidget.defaultProps = {
  iconType: null,
  description: null,
};

PieChartWidget.propTypes = {
  heading: PropTypes.string.isRequired,
  iconType: PropTypes.string,
  description: PropTypes.string,
  data: PropTypes.shape({
    results: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
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
)(PieChartWidget);
