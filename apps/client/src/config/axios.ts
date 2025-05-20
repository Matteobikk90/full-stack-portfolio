import axios from 'axios';

const api = axios.create({
  baseURL: '/',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401 || status === 403) {
      console.warn('Unauthorized or Forbidden:', status);
    }

    console.error('API Error:', error.response?.data || error.message);

    return Promise.reject(error);
  }
);

export default api;
