import axios from "axios";

const BACKEND_URL = `https://6.react.pages.academy/wtw`;
const REQUEST_TIMEOUT = 5000;

const HttpCode = {
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  SUCCES: 200
};

export const createAPI = (onUnauthorized, loginError, postCommentError) => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
    withCredentials: true,
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    const {response: {
      status,
      config: {
        method,
        url
      }
    }} = err;

    if (status === HttpCode.UNAUTHORIZED) {
      onUnauthorized();

      throw err;
    }

    if (status !== HttpCode.SUCCES && url.includes(`comment`) && method === `post`) {
      postCommentError();

      throw err;
    }

    if (status === HttpCode.BAD_REQUES && url.includes(`login`) && method === `post`) {
      loginError();

      throw err;
    }

    if (status === HttpCode.NOT_FOUND) {
      throw status;
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
