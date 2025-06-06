import { z } from 'zod';

export const createProjectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9-]+$/, 'Slug must be URL-friendly'),
  repoUrl: z
    .string()
    .url('Invalid repository URL')
    .optional()
    .or(z.literal('')),
  demoUrl: z.string().url('Invalid demo URL').optional().or(z.literal('')),
  technologies: z
    .array(z.string())
    .nonempty('At least one technology is required'),
  isFeatured: z.boolean().optional().default(false),
  imageUrl: z.string().url('Invalid image URL').optional(),
});

export const idParamSchema = z.object({
  id: z.string().cuid(),
});

export const updateProjectSchema = createProjectSchema.partial();

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
export type IdParamInput = z.infer<typeof idParamSchema>;
