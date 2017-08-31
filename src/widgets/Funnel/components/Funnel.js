import React from 'react';
import PropTypes from 'prop-types';
import RelativeTime from 'react-relative-time';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { compose } from 'redux';
import { DragSource, DropTarget } from 'react-dnd';

import BasicTable from '../../../components/BasicTable/BasicTable';
import { dragSource, dropTarget, draggingStyle } from '../../../lib/draggable';
import constants from '../../../config/constants';
import getIcon from '../../../lib/getIcon';
import './Funnel.scss';

export const getTableData = data => data.map(el => [el.name, el.count]);
export const fixSilhouette = value => Math.abs(value * 2);

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

const Funnel = ({ connectDragSource, connectDragPreview, connectDropTarget, isDragging, isOver, ...props }) =>
  compose(connectDragSource, connectDropTarget)(
    <div className="panel Funnel NewRelicWebsiteFunnel" style={draggingStyle(isDragging, isOver)}>
      {connectDragPreview(
        <div className="panel-heading">
          <div className="panel-title-text">
            {props.heading}
          </div>
          {getIcon(props.iconType)}
        </div>,
      )}
      <div className="panel-body hidden-xs">
        <div className="row">
          <ResponsiveContainer width="100%">
            <AreaChart
              data={props.data.results}
              layout="vertical"
              width={600}
              height={165}
              stackOffset="silhouette"
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <XAxis tickFormatter={fixSilhouette} type="number" stroke="#b7b7b7" fill="#b7b7b7" />
              <YAxis width={140} dataKey="name" type="category" stroke="#b7b7b7" fill="#b7b7b7" />
              <Tooltip />
              <Area type="monotone" dataKey="count" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="panel-body visible-xs-block">
        {props.data.results && <BasicTable data={getTableData(props.data.results)} />}
      </div>
      <div className="panel-footer">
        {props.description || props.data.description}
        {updatedTime(props.data.updated)}
      </div>
    </div>,
  );

Funnel.defaultProps = {
  iconType: null,
  description: null,
};

Funnel.propTypes = {
  heading: PropTypes.string.isRequired,
  iconType: PropTypes.string,
  description: PropTypes.string,
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
)(Funnel);
