export type CommentType = {
  id: string;
  content: string;
  createdAt: string; // ISO string from Date
  userId: string;
  user: {
    id: string;
    name: string;
    avatarUrl?: string | null;
    // add more fields if needed
  };
  experienceId?: string | null;
  projectId?: string | null;
};
