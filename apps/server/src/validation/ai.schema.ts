import { z } from 'zod';

export const aiMessageSchema = z.object({
  message: z.string().min(1).max(500),
});
