import { handleActions } from 'redux-actions';

import { onReceive } from '../../actions/history/bugsHistory';

const reducer = handleActions(
  {
    [onReceive]: (state, { payload }) => ({
      ...payload,
    }),
  },
  {
    data: { history: [] },
    updated: null,
    status: 'error',
    error: null,
  },
);

export default reducer;
