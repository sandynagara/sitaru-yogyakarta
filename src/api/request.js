import axios from 'axios';

const BASE_URL = '/api';
const TIMEOUT = 600000;

const service = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
});


const handleRequestError = (error) => {
  console.error(error);
  return Promise.reject(error);
};

const handleUnauthorized = (data) => {
  window.dispatchEvent(new Event('APP_AUTH_UNAUTHORIZED'));
  return data.message || 'Unauthorized';
};

const handleForbiddenOrExpiredToken = (data) => {
  if (data?.detail) { // for telpro Unauthenticated
    window.dispatchEvent(new Event('APP_AUTH_UNAUTHORIZED'));
    return data.detail || 'Forbidden';
  } else {
    return data.message || 'Forbidden';
  }
};

const handleResponseError = (error) => {
  let messageText = 'Something Went Wrong';

  if (error.response) {
    const { status, data } = error.response;

    const statusMessages = {
      400: data.message || 'Bad Request',
      401: handleUnauthorized,
      403: handleForbiddenOrExpiredToken,
      404: data.message || 'Not Found',
      405: data.message || 'Method Not Allowed',
      406: data.message || 'Not Acceptable',
      412: data.message || 'Precondition Failed',
      415: data.message || 'Unsupported Media Type',
      422: data.message || 'Unprocessable Entity',
      408: data.message || 'Request Timeout',
      500: data.message || 'Internal Server Error',
      501: data.message || 'Not Implemented',
    };

    const statusMessageHandler = statusMessages[status];
    const customErrorMessage = typeof statusMessageHandler === 'function'
      ? statusMessageHandler(data)
      : statusMessageHandler;

    messageText = `${customErrorMessage || 'Something Went Wrong'}`;
  }

  error.response.data.message = messageText;


  return Promise.reject(error);
};

service.interceptors.request.use((config) => config, handleRequestError);

service.interceptors.response.use((response) => {
  return response.data;
}, handleResponseError);

export default service;
