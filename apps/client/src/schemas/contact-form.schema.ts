import { literal, object, string } from 'zod';

export const currentSchemaDefault = {
  name: '',
  email: '',
  message: '',
  acceptedTerms: false,
};

export const currentSchema = object({
  name: string().min(3, { message: 'Name must be at least 3 characters' }),
  email: string().email({ message: 'Invalid email address' }),
  message: string().min(1, { message: 'Message is required' }),
  acceptedTerms: literal(true, {
    errorMap: () => ({
      message: 'You must accept the terms and privacy policy',
    }),
  }),
});
