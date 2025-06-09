import type { WorkTypes } from '@/types/works.types';
import { axiosGet } from '@/utils/api';
import { URL_ENDPOINTS } from '@/utils/constants';

// Fetch Works
export const fetchWorks = async () => {
  const response = await axiosGet<WorkTypes[]>(URL_ENDPOINTS.getWorks);

  if (!response) {
    throw new Error('Failed to load works');
  }

  return response;
};
