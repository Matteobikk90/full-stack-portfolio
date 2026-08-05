import type { WorkTypes } from '@/types/works.types';
import { apiGet } from '@/utils/api';
import { URL_ENDPOINTS } from '@/utils/constants';

export const fetchWorks = async () => {
  const response = await apiGet<WorkTypes[]>(URL_ENDPOINTS.getWorks);

  if (!response) {
    throw new Error('Failed to load works');
  }

  return response;
};
