import { handleActions } from 'redux-actions';
import { receiveBugsHistory } from '../../actions/index';

const bugsHistory = handleActions(
  {
    [receiveBugsHistory]: (state, { payload }) => ({
      history: payload.history,
      period: payload.period,
    }),
  },
  {
    history: [],
    period: 'loading...',
  },
);

export default bugsHistory;
