import axios from 'axios';

export const baseURL = 'https://cyclecare-server-1-0.onrender.com/api/';

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
