import 'whatwg-fetch';
import moment from 'moment';
import fetchApi, { fetchUrl } from '../lib/fetchApi';

const dataSources = [
  { key: 'customWidget', fetchFunction: () => fetchUrl('http://www.mocky.io/v2/5968eb61110000090e614cbb') },
  {
    key: 'anotherCustomWidget',
    fetchFunction: () => fetchUrl('http://www.mocky.io/v2/59707da9100000a30471d9b6'),
  },
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
  {
    key: 'customBreakdown',
    fetchFunction: () => fetchUrl('http://www.mocky.io/v2/596f52eb0f00008d036b7535'),
  },
  { key: 'newRelicWebsiteFunnel', fetchFunction: () => fetchApi('newRelic/WebsiteFunnel') },
  { key: 'customFunnel', fetchFunction: () => fetchUrl('http://www.mocky.io/v2/596f52eb0f00008d036b7535') },
];

export default dataSources;
