import { z } from 'zod';

export const currentSchemaDefault = { name: '', email: '', message: '' };

export const currentSchema = z.object({
  name: z.string().min(3, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  message: z.string().min(1, { message: 'Message is required' }),
});
