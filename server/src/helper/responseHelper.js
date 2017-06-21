const getResponseSuccess = (data) => ({
  status: 'success',
  message: '',
  data: data || {},
});

export default getResponseSuccess;
