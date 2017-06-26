const getResponseSuccess = (data) => ({
  status: 'success',
  data: data || {},
});

const getResponseError = (message) => ({
  status: 'error',
  message: message || '',
});

export { getResponseSuccess, getResponseError };
