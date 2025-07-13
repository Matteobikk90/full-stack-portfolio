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
  search: '/api/search',
};

export const skillsFontSize = 60;
export const currentYear = new Date().getFullYear();
export const experienceYears = new Date().getFullYear() - 2017;
export const adminEmails = [
  'matteo.soresini@hotmail.it',
  'matteo.soresini90@gmail.com',
];
export const tenDays = 10 * 24 * 60 * 60 * 1000;
export const virtualAdminId = 'admin_virtual_id';
