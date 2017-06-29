import 'whatwg-fetch';
import { createAction } from 'redux-actions';
import fetchApi from './fetchApi';

export const requestJiraIssues = createAction('JIRAISSUES_REQUEST');
export const receiveJiraIssues = createAction(
  'JIRAISSUES_RECEIVE',
  json => json.data,
);

export const fetchJiraIssues = () => dispatch => {
  dispatch(requestJiraIssues());
  return fetchApi('jiraIssues').then(json => dispatch(receiveJiraIssues(json)));
};
