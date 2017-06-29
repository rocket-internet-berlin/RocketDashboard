import { handleActions } from 'redux-actions';
import { receiveJiraIssues } from '../../actions';

const jiraIssues = handleActions(
  {
    [receiveJiraIssues]: (state, { payload }) => ({
      blockers: payload.blockers,
      criticals: payload.criticals,
      others: payload.others,
    }),
  },
  {
    blockers: 0,
    criticals: 0,
    others: 0,
  },
);

export default jiraIssues;
