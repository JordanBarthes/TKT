export const fetchApi = async ({ url,
  method, body, statusCode = null }) => {
  try {

    const fetchParams = {
      method, body
      // , headers: {
      //   'Content-Type': 'application/json'
      // }
    };

    if ((method === 'POST' || method === 'PUT') && !body) {
      throw new Error('Request body required', fetchParams);
    }

    const response = await fetch(url, fetchParams);
    console.log('RESPONSE', response)

    if (response.status === statusCode) {
      return response.json();
    }
    throw response
  } catch (error) {
    return error;
  }
};
