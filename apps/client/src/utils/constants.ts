export const toastDuration = 3000;
export const proxyTarget =
  import.meta.env.VITE_PROXY_TARGET || 'http://localhost:4000';
export const SOCKET_URL = import.meta.env.DEV ? proxyTarget : undefined;

export const URL_ENDPOINTS = {
  getExperiences: '/api/experiences',
  getExperience: (id: string) => `/api/experiences/${id}`,
  getWorks: '/api/projects',
  getLikes: (projectId: string) => `/api/likes/${projectId}`,
  toggleLike: '/api/likes',
};

export const skillsFontSize = 60;
export const currentYear = new Date().getFullYear();
export const experience = `${currentYear - 2017}+ Years`;
export const adminEmail = 'matteo.soresini@hotmail.it';
