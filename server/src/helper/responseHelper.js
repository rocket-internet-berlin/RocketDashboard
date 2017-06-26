const getResponseSuccess = (data) => ({
  status: 'success',
  data: data || {},
});

const getResponseError = (message) => ({
  status: 'success',
  message: message || '',
});

export { getResponseSuccess, getResponseError };
