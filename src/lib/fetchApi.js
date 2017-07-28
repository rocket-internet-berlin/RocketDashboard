import 'whatwg-fetch';

const apiUrl = '//localhost:3001/api';

export const fetchApi = endpoint => fetch(`${apiUrl}/${endpoint}`).then(response => response.json());
export const fetchUrl = url => fetch(url).then(response => response.json());
