import { handleActions } from 'redux-actions';
import onReceive from '../actions/number';

const reducer = handleActions(
  {
    [onReceive]: (state, { payload }) => ({
      ...state,
      [payload.key]: {
        current: payload.current,
        previous: payload.previous,
      },
    }),
  },
  {},
);

export default reducer;