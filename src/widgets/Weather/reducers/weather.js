import { handleActions } from 'redux-actions';
import { onReceive } from '../actions/weather';

const reducer = handleActions(
  {
    [onReceive]: (state, { payload }) => ({ weather: payload.data }),
  },
  {
    weather: {},
  },
);

export default reducer;
