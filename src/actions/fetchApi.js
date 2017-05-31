import 'whatwg-fetch';

const fetchApi = url => fetch(`/api/${url}`).then(response => response.json());

export default fetchApi;
