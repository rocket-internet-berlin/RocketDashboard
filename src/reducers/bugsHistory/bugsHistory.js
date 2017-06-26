import { handleActions } from 'redux-actions';
import { receiveBugsHistory } from '../../actions';

const bugsHistory = handleActions(
  {
    [receiveBugsHistory]: (state, { payload }) => ({ history: payload }),
  },
  {
    history: [],
  },
);

export default bugsHistory;
