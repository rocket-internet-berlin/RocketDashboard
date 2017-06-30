import 'whatwg-fetch';
import { createAction } from 'redux-actions';
import fetchApi from '../../../lib/fetchApi';

export const onReceive = createAction('JIRAISSUES_RECEIVE', json => json.data);

export const refresh = () => dispatch => {
  fetchApi('jiraIssues').then(json => dispatch(onReceive(json)));
};
