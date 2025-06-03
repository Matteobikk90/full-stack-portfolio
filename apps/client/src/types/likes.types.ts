export type LikeType = {
  id: string;
  createdAt: string;
  userId: string;
  user: {
    id: string;
    name: string;
    avatarUrl?: string | null;
  };
  experienceId?: string | null;
  projectId?: string | null;
};
