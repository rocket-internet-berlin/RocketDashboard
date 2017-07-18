import 'whatwg-fetch';
import fetchApi, { fetchUrl } from '../lib/fetchApi';

const customDataSources = [
  { key: 'customWidget', fetch: () => fetchUrl('http://www.mocky.io/v2/5968eb61110000090e614cbb') },
  { key: 'anotherCustomWidget', fetch: () => fetchUrl('http://www.mocky.io/v2/596ce7c3100000bf047e2302') },
  { key: 'newRelicCliErrors', fetch: () => fetchApi('newRelic/cliErrors') },
];

export default customDataSources;
