import type { CommentType } from '@/types/comments.types';
import type { LikeType } from '@/types/likes.types';

export type ExperienceTypes = {
  id: string;
  company: string;
  title: string;
  location: string | null;
  slug: string;
  url: string;
  isRemote: boolean | null;
  startDate: string;
  endDate?: string | null;
  description: string | null;
  duties: string[];
  technologies: string[];
  imageUrl?: string | null;
  createdAt: string;
  Comment: CommentType[];
  Like: LikeType[];
  projects: {
    id: string;
    title: string;
    url: string;
  }[];
};
