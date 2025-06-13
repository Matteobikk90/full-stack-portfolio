import type { LikeType } from '@/types/likes.types';
import { axiosGet, axiosPost } from '@/utils/api';
import { URL_ENDPOINTS } from '@/utils/constants';

export const getLikes = async (projectId: string): Promise<LikeType> => {
  if (!projectId) throw new Error('Project ID is required');

  try {
    const result = await axiosGet<LikeType>(URL_ENDPOINTS.getLikes(projectId));
    if (!result) {
      throw new Error('Failed to fetch likes');
    }
    return result;
  } catch (error) {
    console.error('Error fetching likes:', error);
    throw error;
  }
};

export const toggleLike = async (projectId: string): Promise<LikeType> => {
  if (!projectId) throw new Error('Project ID is required');

  try {
    const result = await axiosPost<LikeType, { projectId: string }>(
      URL_ENDPOINTS.toggleLike,
      {
        projectId,
      }
    );
    if (!result) {
      throw new Error('Failed to toggle like');
    }
    return result;
  } catch (error) {
    console.error('Error sending like:', error);
    throw error;
  }
};
