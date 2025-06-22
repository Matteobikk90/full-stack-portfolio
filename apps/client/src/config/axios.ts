import { proxyTarget } from '@/utils/constants';
import axios from 'axios';

const api = axios.create({
  baseURL: proxyTarget,
  withCredentials: true,
});

let isRefreshing = false;
let requestQueue: ((tokenRefreshed: boolean) => void)[] = [];

const processQueue = (success: boolean) => {
  requestQueue.forEach((callback) => callback(success));
  requestQueue = [];
};

const handleLogout = () => {
  window.location.href = '/';
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if (!originalRequest._retryCount) originalRequest._retryCount = 0;

    if (status === 401 && originalRequest._retryCount < 1) {
      originalRequest._retryCount++;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          await api.post('/auth/refresh');
          processQueue(true);
        } catch (refreshError) {
          processQueue(false);
          handleLogout();
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return new Promise((resolve, reject) => {
        requestQueue.push((success) => {
          if (success) {
            resolve(api(originalRequest));
          } else {
            reject(error);
          }
        });
      });
    }

    return Promise.reject(error);
  }
);

export default api;
