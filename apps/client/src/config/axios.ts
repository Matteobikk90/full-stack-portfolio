import { proxyTarget } from '@/utils/constants';
import axios from 'axios';

const api = axios.create({
  baseURL: proxyTarget,
  withCredentials: true,
});

let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

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
        refreshPromise = api
          .post('/auth/refresh')
          .then(() => {
            isRefreshing = false;
            refreshPromise = null;
          })
          .catch(() => {
            isRefreshing = false;
            refreshPromise = null;
          });
      }

      try {
        if (refreshPromise) {
          await refreshPromise;
          return api(original);
        }
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(err);
  }
);

export default api;
