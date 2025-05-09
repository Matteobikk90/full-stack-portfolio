import { z } from 'zod';

export const createCommentSchema = z.object({
  content: z.string().min(1),
  experienceId: z.string().cuid().optional(),
  projectId: z.string().cuid().optional(),
});

export const idParamSchema = z.object({
  id: z.string().cuid(),
});

export const updateCommentSchema = z.object({
  content: z.string().min(1),
});

export type CreateCommentInput = z.infer<typeof createCommentSchema>;
export type UpdateCommentInput = z.infer<typeof updateCommentSchema>;
export type IdParamInput = z.infer<typeof idParamSchema>;
