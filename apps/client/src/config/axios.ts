import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true,
});

let isRefreshing = false;
let subscribers: (() => void)[] = [];

const onRefreshed = () => {
  subscribers.forEach((callback) => callback());
  subscribers = [];
};

api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    // If 401 and not already retried
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          await api.post('/auth/refresh');
          isRefreshing = false;
          onRefreshed();
        } catch (refreshError) {
          isRefreshing = false;
          return Promise.reject(refreshError);
        }
      }

      return new Promise((resolve) => {
        subscribers.push(() => resolve(api(originalRequest)));
      });
    }

    return Promise.reject(error);
  }
);

export default api;
