import axios from 'axios';

export const baseURL = 'http://192.168.15.15:8080/api/';

const http = axios.create({
  baseURL,
});

http.interceptors.request.use(
  config => {
    if (config.data?._parts) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }

    const accessToken =
      sessionStorage.getItem('accessToken') ||
      localStorage.getItem('accessToken');

    if (accessToken) {
      config.headers!.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  error => Promise.reject(error),
);

export { http };
