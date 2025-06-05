import { z } from 'zod';

export const createExperienceSchema = z.object({
  company: z.string().min(1, 'Company is required'),
  title: z.string().min(1, 'Title is required'),
  location: z.string().min(1, 'Location is required').optional(),
  startDate: z.coerce.date({ required_error: 'Start date is required' }),
  endDate: z.coerce
    .date({ invalid_type_error: 'Invalid end date' })
    .nullable()
    .optional(),
  description: z.string().min(1).optional(),
  duties: z.array(z.string().min(1)).optional(),
  technologies: z.array(z.string().min(1)).optional(),
  imageUrl: z.string().url('Invalid image URL').optional(),
});

export const idParamSchema = z.object({
  id: z.string(),
});

export const updateExperienceSchema = createExperienceSchema.partial();

export type CreateExperienceInput = z.infer<typeof createExperienceSchema>;
export type UpdateExperienceInput = z.infer<typeof updateExperienceSchema>;
export type IdParamInput = z.infer<typeof idParamSchema>;
