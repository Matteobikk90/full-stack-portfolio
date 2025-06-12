import { z } from 'zod';

export const toggleLikeSchema = z
  .object({
    projectId: z.string().cuid().optional(),
  })
  .refine((data) => data.projectId, {
    message: 'projectId is required',
  });

export type ToggleLikeInput = z.infer<typeof toggleLikeSchema>;
