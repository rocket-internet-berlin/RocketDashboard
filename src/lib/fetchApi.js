import 'whatwg-fetch';

const fetchApi = endpoint =>
  fetch(`/api/${endpoint}`).then(response => response.json());

export default fetchApi;
