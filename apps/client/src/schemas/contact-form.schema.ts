import { z } from 'zod';

export const currentSchemaDefault = {
  name: '',
  email: '',
  message: '',
  acceptedTerms: false,
};

export const currentSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  message: z.string().min(1, { message: 'Message is required' }),
  acceptedTerms: z.literal(true, {
    errorMap: () => ({
      message: 'You must accept the terms and privacy policy',
    }),
  }),
});
