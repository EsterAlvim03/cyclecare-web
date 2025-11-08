import axios from 'axios';

export const baseURL = 'http://127.0.0.1:8080/';

const http = axios.create({
  baseURL,
});

http.interceptors.request.use(
  config => {
    if (config.data?._parts) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }

    const accessToken = sessionStorage.getItem('accessToken');
    if (accessToken) {
      config.headers!.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  error => Promise.reject(error),
);

export { http };
