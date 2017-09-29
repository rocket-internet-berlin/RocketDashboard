import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { DragSource, DropTarget } from 'react-dnd';

import formatter from '../../../lib/formatter';
import { dragSource, dropTarget, draggingStyle } from '../../../lib/draggable';
import constants from '../../../config/constants';
import './Weather.scss';
import iconHandler from '../../../lib/iconHandler';

const weatherIcon = icon => {
  if (!icon) {
    return null;
  }
  const iconUrl = `http://openweathermap.org/img/w/${icon}.png`;
  return <img className="pull-right weather-image" src={iconUrl} alt="Icon depicting current weather" />;
};

const getTemperature = temp => {
  if (temp) {
    return <span className="current">{temp}&deg;</span>;
  }

  return <span>Loading data...</span>;
};

const renderCustomTooltip = data => {
  if (data.active) {
    const { payload, label } = data;
    return (
      <div className="custom-tooltip">
        {weatherIcon(payload[0].payload.icon)}
        <div className="label">Date: {label}</div>
        <div className="temp-min">Min Temp: {payload[0].value}&deg;</div>
        <div className="temp-max">Max Temp: {payload[1].value}&deg;</div>
      </div>
    );
  }

  return null;
};

const Weather = ({
  connectDragSource,
  connectDragPreview,
  connectDropTarget,
  isDragging,
  isOver,
  iconType,
  ...props
}) =>
  compose(connectDragSource, connectDropTarget)(
    <div className="panel Weather" style={draggingStyle(isDragging, isOver)}>
      {connectDragPreview(
        <div className="panel-heading">
          <div className="panel-title-text">Weather for {props.weather.city}</div>
          {iconHandler.getIconPartial(iconType)}
        </div>,
      )}
      <div className="panel-body">
        <div className="row">
          <div className="pull-left">
            {getTemperature(props.weather.temp)}
            {weatherIcon(props.weather.icon)}
          </div>
          <div className="weather-chart">
            <ResponsiveContainer width="100%" height="100%" minHeight={150}>
              <AreaChart data={props.forecast.result} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <XAxis dataKey="date" stroke={constants.chartColor.tickColor} fill={constants.chartColor.tickColor} />
                <YAxis stroke={constants.chartColor.tickColor} fill={constants.chartColor.tickColor} />
                <Tooltip content={renderCustomTooltip} />
                {/* <Area dataKey="temperature" stroke="#82ca9d" /> */}
                <Area type="monotone" dataKey="temp_min" stroke={constants.chartColor.green} fill="none" />
                <Area type="monotone" dataKey="temp_max" stroke={constants.chartColor.red} fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="panel-footer">
        <span>
          {props.weather.description}
          {formatter.formatWidgetUpdatedTimestamp(props.weather.updated)}
        </span>
      </div>
    </div>,
  );

const mapStateToProps = state => ({
  weather: state.weather.weather,
  forecast: state.weather.forecast,
});

Weather.propTypes = {
  weather: PropTypes.shape({
    city: PropTypes.string,
    temp: PropTypes.number,
    icon: PropTypes.string,
    description: PropTypes.string,
    updated: PropTypes.string,
  }).isRequired,
  forecast: PropTypes.shape({
    result: PropTypes.arrayOf(PropTypes.object),
  }),
  iconType: PropTypes.string,
};

Weather.defaultProps = {
  weather: {
    city: null,
    temp: null,
    icon: null,
    description: null,
    updated: null,
  },
  forecast: {
    result: null,
  },
  iconType: null,
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
  connect(mapStateToProps),
)(Weather);
