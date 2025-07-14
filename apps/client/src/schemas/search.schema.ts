import z from 'zod';

export const filterSchema = z.object({
  technology: z.array(z.string()).optional(),
  location: z.array(z.string()).optional(),
  company: z.array(z.string()).optional(),
  role: z.array(z.string()).optional(),
});
