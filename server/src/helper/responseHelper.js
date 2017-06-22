const getResponseSuccess = (data) => ({
  status: 'success',
  message: '',
  data: data || {},
});

const getResponseError = (message) => ({
  status: 'success',
  message: message || '',
});

export { getResponseSuccess, getResponseError };
