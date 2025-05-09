import { z } from 'zod';

export const toggleLikeSchema = z
  .object({
    experienceId: z.string().cuid().optional(),
    projectId: z.string().cuid().optional(),
  })
  .refine((data) => data.experienceId || data.projectId, {
    message: 'Either experienceId or projectId is required',
  });

export type ToggleLikeInput = z.infer<typeof toggleLikeSchema>;
