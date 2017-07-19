import 'whatwg-fetch';
import moment from 'moment';
import fetchApi, { fetchUrl } from '../lib/fetchApi';

const customDataSources = [
  { type: 'number', key: 'customWidget', fetch: () => fetchUrl('http://www.mocky.io/v2/5968eb61110000090e614cbb') },
  {
    type: 'number',
    key: 'anotherCustomWidget',
    fetch: () => fetchUrl('http://www.mocky.io/v2/596ce7c3100000bf047e2302'),
  },
  { type: 'number', key: 'newRelicCliErrors', fetch: () => fetchApi('newRelic/cliErrors') },
  { type: 'number', key: 'newRelicLoadTime', fetch: () => fetchApi('newRelic/loadTime') },
  { type: 'number', key: 'newRelicErrors', fetch: () => fetchApi('newRelic/errors') },
  { type: 'number', key: 'newRelicSuccessfulBookings', fetch: () => fetchApi('newRelic/successfulBookings') },
  {
    type: 'number',
    key: 'weekNumber',
    fetch: () => new Promise(resolve => resolve({ data: { current: parseInt(moment().format('w'), 10) } })),
  },
  { type: 'number', key: 'newRelicUniqueSessions', fetch: () => fetchApi('newRelic/uniqueSessions') },
  { type: 'breakdown', key: 'newRelicErrorBreakdown', fetch: () => fetchApi('newRelic/errorBreakdown') },
  {
    type: 'breakdown',
    key: 'customBreakdown',
    fetch: () => fetchUrl('http://www.mocky.io/v2/596f52eb0f00008d036b7535'),
  },
  { type: 'funnel', key: 'newRelicWebsiteFunnel', fetch: () => fetchApi('newRelic/WebsiteFunnel') },
  { type: 'funnel', key: 'customFunnel', fetch: () => fetchUrl('http://www.mocky.io/v2/596f52eb0f00008d036b7535') },
];

export default customDataSources;
