import { handleActions } from 'redux-actions';
import isEmpty from 'lodash/isEmpty';

import { onReceive } from '../../actions/history/bugsHistory';

const reducer = handleActions(
  {
    [onReceive]: (state, { payload }) => ({
      history: payload.history,
      updated: payload.updated,
      status: isEmpty(payload.history) ? 'error' : 'success',
      error: payload.error,
    }),
  },
  {
    history: [],
    updated: null,
    status: 'error',
    error: null,
  },
);

export default reducer;
