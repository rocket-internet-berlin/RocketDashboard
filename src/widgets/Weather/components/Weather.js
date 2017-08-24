import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RelativeTime from 'react-relative-time';
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

const weatherIcon = icon => {
  if (!icon) {
    return null;
  }
  const iconUrl = `http://openweathermap.org/img/w100/${icon}.png`;
  return <img className="pull-right" src={iconUrl} alt="Icon depicting current weather" />;
};

const getTemperature = temp => {
  if (temp) {
    return (
      <span className="current">
        {temp} &deg;
      </span>
    );
  }

  return <span>Loading data...</span>;
};

const Weather = ({ weather, iconType }) =>
  <div className="panel Number">
    <div className="panel-heading">
      Weather for {weather.weather.city}
      {getIcon(iconType)}
    </div>
    <div className="panel-body">
      {getTemperature(weather.weather.temp)}
      {weatherIcon(weather.weather.icon)}
    </div>
    <div className="panel-footer">
      <span>
        {weather.weather.description}
        {updatedTime(weather.weather.updated)}
      </span>
    </div>
  </div>;

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

export default connect(mapStateToProps)(Weather);
