import { handleActions } from 'redux-actions';
import { onReceive } from '../../actions/history/statusCakeHistory';

const reducer = handleActions(
  {
    [onReceive]: (state, { payload }) => ({
      history: payload.data ? payload.data.history : [],
      updated: payload.data ? payload.data.updated : new Date(),
      status: payload.status,
      error: payload.message,
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
