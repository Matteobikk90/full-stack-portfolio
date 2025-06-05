export const toastDuration = 3000;
export const proxyTarget = 'http://localhost:4000';
export const SOCKET_URL = import.meta.env.DEV ? proxyTarget : undefined;

export const URL_ENDPOINTS = {
  getExperiences: '/api/experiences',
  getExperience: (id: string) => `/api/experiences/${id}`,
};

export const skillsFontSize = 60;

export const experience = `${new Date().getFullYear() - 2017}+ Years`;
