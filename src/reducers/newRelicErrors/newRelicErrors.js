import { handleActions } from 'redux-actions';
import { receiveNewRelicErrors } from '../../actions';

const newRelicErrors = handleActions(
  {
    [receiveNewRelicErrors]: (state, { payload }) => ({
      lastWeek: payload.lastWeek,
      thisWeek: payload.thisWeek,
    }),
  },
  {
    lastWeek: 0,
    thisWeek: 0,
  },
);

export default newRelicErrors;
