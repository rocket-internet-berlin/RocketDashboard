import { handleActions } from 'redux-actions';
import onReceive from '../../actions/generic/generic';

const reducer = handleActions(
  {
    [onReceive]: (state, { payload }) => ({
      ...state,
      [payload.key]: payload,
    }),
  },
  {
    results: {},
  },
);

export default reducer;
