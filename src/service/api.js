export const api = async (url, method, body = null) => {
  try {

    const fetchParams = { method, body: body, };

    if ((method === 'POST' || method === 'PUT') && !body) {
      throw new Error('Request body required', fetchParams);
    }

    fetchParams.headers = new Headers({
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Access-Control-Request-Headers': 'http://localhost:3000'
    })

    const response = await fetch(url, {
      Accept: '*/*',
      Origin: 'http://localhost:3000'
    });
    return response;
  } catch (e) {
    return e;
  }
};

export const fetchApi = async ({ url,
  method, body, statusCode = null }) => {
  try {
    const response = await api(url, method, body);
    if (response.status === statusCode) {
      return response.json();
    }
    return false
  } catch (error) {
    return error;
  }
};
