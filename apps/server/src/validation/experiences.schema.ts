import { z } from 'zod';

export const createExperienceSchema = z.object({
  company: z.string().min(1),
  title: z.string().min(1),
  location: z.string().optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().nullable().optional(),
  description: z.string().optional(),
  duties: z.array(z.string()).optional(),
  technologies: z.array(z.string()).optional(),
  imageUrl: z.string().url().optional(),
});

export const updateExperienceSchema = createExperienceSchema.partial();

export const idParamSchema = z.object({
  id: z.string().cuid(),
});

export type CreateExperienceInput = z.infer<typeof createExperienceSchema>;
export type UpdateExperienceInput = z.infer<typeof updateExperienceSchema>;
export type IdParamInput = z.infer<typeof idParamSchema>;
