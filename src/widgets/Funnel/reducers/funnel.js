import { handleActions } from 'redux-actions';
import onReceive from '../actions/funnel';

const reducer = handleActions(
  {
    [onReceive]: (state, { payload }) => ({
      ...state,
      [payload.key]: {
        results: payload.results,
        description: payload.description,
      },
    }),
  },
  {
    results: {},
  },
);

export default reducer;
