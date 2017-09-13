import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
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
    return (
      <span className="current">
        {temp}&deg;
      </span>
    );
  }

  return <span>Loading data...</span>;
};

const Weather = ({ connectDragSource, connectDropTarget, isDragging, isOver, iconType, weather }) =>
  compose(connectDragSource, connectDropTarget)(
    <div className="panel Number" style={draggingStyle(isDragging, isOver)}>
      <div className="panel-heading">
        <div className="panel-title-text">Weather for {weather.weather.city}</div>
        {iconHandler.getIconPartial(iconType)}
      </div>
      <div className="panel-body">
        {getTemperature(weather.weather.temp)}
        {weatherIcon(weather.weather.icon)}
      </div>
      <div className="panel-footer">
        <span>
          {weather.weather.description}
          {formatter.formatWidgetUpdatedTimestamp(weather.weather.updated)}
        </span>
      </div>
    </div>,
  );

const mapStateToProps = state => ({
  weather: state.weather,
});

Weather.propTypes = {
  weather: PropTypes.shape({
    city: PropTypes.string,
    temp: PropTypes.string,
    icon: PropTypes.string,
    description: PropTypes.string,
    updated: PropTypes.string,
  }).isRequired,
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
)(Weather);
