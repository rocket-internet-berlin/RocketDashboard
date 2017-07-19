import { handleActions } from 'redux-actions';
import onReceive from '../actions/breakdown';

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
  {},
);

export default reducer;
