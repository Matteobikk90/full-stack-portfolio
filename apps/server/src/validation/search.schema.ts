import { z } from 'zod';

export const filterSchema = z.object({
  technology: z
    .string()
    .transform((val) => val.split(',').filter(Boolean))
    .optional(),
  location: z
    .string()
    .transform((val) => val.split(',').filter(Boolean))
    .optional(),
  company: z
    .string()
    .transform((val) => val.split(',').filter(Boolean))
    .optional(),
  role: z
    .string()
    .transform((val) => val.split(',').filter(Boolean))
    .optional(),
});
