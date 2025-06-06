import { createUserSchema } from '@/validation/user.schema';
import { describe, expect, it } from 'vitest';

describe('createUserSchema', () => {
  it('passes with valid input (minimum fields)', () => {
    const result = createUserSchema.safeParse({
      name: 'Matteo',
      email: 'matteo@example.com',
      provider: 'google',
    });
    expect(result.success).toBe(true);
  });

  it('passes with all optional fields', () => {
    const result = createUserSchema.safeParse({
      name: 'Matteo',
      email: 'matteo@example.com',
      provider: 'github',
      role: 'admin',
      avatarUrl: 'https://example.com/avatar.png',
    });
    expect(result.success).toBe(true);
  });

  it('fails with missing provider', () => {
    const result = createUserSchema.safeParse({
      name: 'Matteo',
      email: 'matteo@example.com',
      // missing provider
    });
    expect(result.success).toBe(false);
  });

  it('fails with invalid provider', () => {
    const result = createUserSchema.safeParse({
      name: 'Matteo',
      email: 'matteo@example.com',
      provider: 'linkedin', // invalid
    });
    expect(result.success).toBe(false);
  });
});
