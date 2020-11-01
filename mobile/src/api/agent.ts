import axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from "axios";

const baseURL = `http://localhost:5000/`;
axios.defaults.baseURL = baseURL;

axios.interceptors.request.use(
  (config) => {
    // const state = store.getState();
    if (state.session.info && state.session.info.token) {
      config.headers.Authorization = `Bearer ${state.session.info.token}`;
    }

    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

interface DetailedError {
  description: string;
  descriptionFormatter: string;
  errorCode: string;
  errorParameters: string[];
  isArchived: boolean;
}

axios.interceptors.response.use(undefined, (error: AxiosError) => {
  const { status, data } = error.response || {};
  throw error.response;
});

const responseBodyAxios = (response: AxiosResponse) => {
  if (
    response.data &&
    typeof response.data === "object" &&
    "data" in response.data &&
    Object.keys(response.data).length === 1
  ) {
    return response.data.data;
  }

  return response.data;
};

export const requests = {
  get: (url: string, params?: {}) =>
    axios
      .get(url, {
        params,
      })
      .then(responseBodyAxios),
  post: (url: string, body: {}, config?: AxiosRequestConfig | undefined) =>
    axios.post(url, body, config).then(responseBodyAxios),
  put: (url: string, body: {}, config?: AxiosRequestConfig | undefined) =>
    axios.put(url, body, config).then(responseBodyAxios),
  delete: (url: string) => axios.delete(url).then(responseBodyAxios),
};

export default {};
