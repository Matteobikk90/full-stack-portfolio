import type { ExperienceTypes } from '@/types/experiences.types';
import { axiosGet } from '@/utils/api';
import { URL_ENDPOINTS } from '@/utils/constants';
import { useQuery } from '@tanstack/react-query';

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

export const useGetExperiences = (enabled = true) =>
  useQuery<ExperienceTypes[]>({
    queryKey: ['getExperiences'],
    queryFn: fetchExperiences,
    enabled,
  });
