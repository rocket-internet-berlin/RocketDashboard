import 'whatwg-fetch';
import moment from 'moment';
import { fetchApi, fetchUrl } from '../lib/fetchApi';

const dataSources = [
  { key: 'newRelicCliErrors', fetchFunction: () => fetchApi('newRelic/cliErrors') },
  { key: 'newRelicLoadTime', fetchFunction: () => fetchApi('newRelic/loadTime') },
  { key: 'newRelicErrors', fetchFunction: () => fetchApi('newRelic/errors') },
  { key: 'newRelicSuccessfulBookings', fetchFunction: () => fetchApi('newRelic/successfulBookings') },
  {
    key: 'weekNumber',
    fetchFunction: () =>
      new Promise(resolve =>
        resolve({
          data: { current: parseInt(moment().format('w'), 10), updated: new Date() },
        }),
      ),
  },
  { key: 'newRelicUniqueSessions', fetchFunction: () => fetchApi('newRelic/uniqueSessions') },
  { key: 'newRelicErrorBreakdown', fetchFunction: () => fetchApi('newRelic/errorBreakdown') },
  { key: 'newRelicWebsiteFunnel', fetchFunction: () => fetchApi('newRelic/WebsiteFunnel') },
  { key: 'jiraInProgress', fetchFunction: () => fetchApi('jira/in-progress') },
  { key: 'jiraSelectedForDevelopment', fetchFunction: () => fetchApi('jira/selected-for-development') },
  { key: 'jiraReadyForQa', fetchFunction: () => fetchApi('jira/ready-for-qa') },
  { key: 'customNumber', fetchFunction: () => fetchUrl('http://www.mocky.io/v2/5996ec35130000c4008b77f9') },
  {
    key: 'customBreakdown',
    fetchFunction: () => fetchUrl('http://www.mocky.io/v2/5996ecef130000bd008b77fd'),
  },
  { key: 'customFunnel', fetchFunction: () => fetchUrl('http://www.mocky.io/v2/5996ed98130000d9008b7801') },
  {
    key: 'trivia',
    fetchFunction: () => fetchApi('trivia/today'),
  },
  { key: 'weather', fetchFunction: () => fetchApi('weather/current') },
  { key: 'twitterFeed', fetchFunction: () => fetchApi('twitter/feed') },
];

export default dataSources;
