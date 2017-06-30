import { handleActions } from 'redux-actions';
import { onReceive } from '../actions/jiraIssues';

const jiraIssues = handleActions(
  {
    [onReceive]: (state, { payload }) => {
      console.log(`json: ${payload}`);
      return { ...payload };
    },
  },
  {
    blockers: 0,
    criticals: 0,
    others: 0,
  },
);

export default jiraIssues;
