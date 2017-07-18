import 'whatwg-fetch';
import moment from 'moment';
import fetchApi, { fetchUrl } from '../lib/fetchApi';

const customDataSources = [
  { key: 'customWidget', fetch: () => fetchUrl('http://www.mocky.io/v2/5968eb61110000090e614cbb') },
  { key: 'anotherCustomWidget', fetch: () => fetchUrl('http://www.mocky.io/v2/596ce7c3100000bf047e2302') },
  { key: 'newRelicCliErrors', fetch: () => fetchApi('newRelic/cliErrors') },
  { key: 'newRelicLoadTime', fetch: () => fetchApi('newRelic/loadTime') },
  { key: 'newRelicErrors', fetch: () => fetchApi('newRelic/errors') },
  { key: 'newRelicSuccessfulBookings', fetch: () => fetchApi('newRelic/successfulBookings') },
  {
    key: 'weekNumber',
    fetch: () => new Promise(resolve => resolve({ data: { current: parseInt(moment().format('w'), 10) } })),
  },
  { key: 'newRelicUniqueSessions', fetch: () => fetchApi('newRelic/uniqueSessions') },
];

export default customDataSources;
