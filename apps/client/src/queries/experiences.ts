import type { ExperienceTypes } from '@/types/experiences.types';
import { axiosGet } from '@/utils/api';
import { URL_ENDPOINTS } from '@/utils/constants';

// Fetch function
export const fetchExperiences = async (): Promise<ExperienceTypes[]> => {
  const response = await axiosGet<ExperienceTypes[]>(
    URL_ENDPOINTS.getExperiences
  );

  if (!response) {
    throw new Error('Failed to load experiences');
  }

  return response;
};
