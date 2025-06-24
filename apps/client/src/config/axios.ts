import { proxyTarget } from '@/utils/constants';
import axios from 'axios';

const api = axios.create({
  baseURL: proxyTarget,
  withCredentials: true,
});

let isRefreshing = false;

api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (r) => r,
  async (err) => {
    const original = err.config;
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          await api.post('/auth/refresh');
        } finally {
          isRefreshing = false;
        }
      }

      return api(original);
    }

    return Promise.reject(err);
  }
);

export default api;
