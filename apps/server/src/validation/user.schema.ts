import { z } from 'zod';

export const idParamSchema = z.object({
  id: z.string().uuid(),
});

export const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  provider: z.enum(['github', 'google']),
  role: z.enum(['user', 'admin']).optional(),
  avatarUrl: z.string().url().optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type IdParamInput = z.infer<typeof idParamSchema>;
