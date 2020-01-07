import config from '../config';

export const api = async (url, method, body = null, headers = {}) => {
  try {

    const fetchParams = { method, body: body, headers };

    if ((method === 'POST' || method === 'PUT') && !body) {
      throw new Error('Request body required', fetchParams);
    }

    if (body) {
      fetchParams.mode = 'no-cors';
      fetchParams.headers = new Headers(
        {
          'Content-Type': 'text/xml; charset=utf-8',
          'Accept': '*/*',
          'Accept-Language': 'en-GB',
          'Accept-Encoding': 'gzip, deflate',
          'Connection': 'Keep-alive',
          'Content-Length': body.length
        });
    }
    const response = await fetch(url, fetchParams);
    return response;
  } catch (e) {
    return e;
  }
};

export const fetchApi = async ({ url,
  method, body, statusCode = null, token = null }) => {
  try {
    const headers = {};
    const result = {
      token,
      success: false,
      responseBody: null
    };

    const response = await api(url, method, body, headers);
    if (response.status === statusCode) {
      result.success = true;
      result.responseBody = response.json();
      return result;
    }
  } catch (error) {
    return error;
  }
};
