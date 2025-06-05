import type { ExperienceTypes } from '@/types/experiences.types';
import { axiosGet } from '@/utils/api';
import { URL_ENDPOINTS } from '@/utils/constants';

// Fetch Experiences
export const fetchExperiences = async () => {
  const response = await axiosGet<ExperienceTypes[]>(
    URL_ENDPOINTS.getExperiences
  );

  if (!response) {
    throw new Error('Failed to load experiences');
  }

  return response;
};

// **Fetch Experience by ID**
export const fetchExperienceById = async (id: string) => {
  if (!id) throw new Error('Experience ID is required');

  try {
    return await axiosGet<ExperienceTypes>(URL_ENDPOINTS.getExperience(id));
  } catch (error) {
    console.error('Error fetching experience:', error);
    throw error;
  }
};
