import { handleActions } from 'redux-actions';
import { onReceive, onReceiveForecast } from '../actions/weather';

const reducer = handleActions(
  {
    [onReceive]: (state, { payload }) => ({
      ...state,
      weather: payload.data,
    }),
    [onReceiveForecast]: (state, { payload }) => ({
      ...state,
      forecast: payload.data,
    }),
  },
  {
    weather: {},
    forecast: {},
  },
);

export default reducer;
