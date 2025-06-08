import type { CommentType } from '@/types/comments.types';
import type { LikeType } from '@/types/likes.types';

export type WorkTypes = {
  id: string;
  number: string;
  title: string;
  slug: string;
  repoUrl: string;
  demoUrl: string;
  isRemote: boolean | null;
  isFeatured: boolean;
  description: string;
  technologies: string[];
  imageUrl?: string | null;
  createdAt: string;
  Comment: CommentType[];
  Like: LikeType[];
};

export type WorkSliceType = {
  activeSlide: number;
  setActiveSlide: (index: number) => void;
};
