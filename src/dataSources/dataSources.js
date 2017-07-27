import 'whatwg-fetch';
import moment from 'moment';
import fetchApi, { fetchUrl } from '../lib/fetchApi';

const dataSources = [
  { key: 'newRelicCliErrors', fetchFunction: () => fetchApi('newRelic/cliErrors') },
  { key: 'newRelicLoadTime', fetchFunction: () => fetchApi('newRelic/loadTime') },
  { key: 'newRelicErrors', fetchFunction: () => fetchApi('newRelic/errors') },
  { key: 'newRelicSuccessfulBookings', fetchFunction: () => fetchApi('newRelic/successfulBookings') },
  {
    key: 'weekNumber',
    fetchFunction: () => new Promise(resolve => resolve({ data: { current: parseInt(moment().format('w'), 10) } })),
  },
  { key: 'newRelicUniqueSessions', fetchFunction: () => fetchApi('newRelic/uniqueSessions') },
  { key: 'newRelicErrorBreakdown', fetchFunction: () => fetchApi('newRelic/errorBreakdown') },
  { key: 'newRelicWebsiteFunnel', fetchFunction: () => fetchApi('newRelic/WebsiteFunnel') },
  { key: 'jiraInProgress', fetchFunction: () => fetchApi('jira/in-progress') },
  { key: 'jiraSelectedForDevelopment', fetchFunction: () => fetchApi('jira/selected-for-development') },
  { key: 'jiraReadyForQa', fetchFunction: () => fetchApi('jira/ready-for-qa') },
  { key: 'customNumber', fetchFunction: () => fetchUrl('http://www.mocky.io/v2/5968eb61110000090e614cbb') },
  {
    key: 'customBreakdown',
    fetchFunction: () => fetchUrl('http://www.mocky.io/v2/596f52eb0f00008d036b7535'),
  },
  { key: 'customFunnel', fetchFunction: () => fetchUrl('http://www.mocky.io/v2/596f52eb0f00008d036b7535') },
];

export default dataSources;
