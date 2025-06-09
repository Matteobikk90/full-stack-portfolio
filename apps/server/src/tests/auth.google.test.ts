import app from '@/app';
import request from 'supertest';
import { describe, expect, it } from 'vitest';

describe('Google OAuth', () => {
  it('should redirect to Google OAuth login', async () => {
    const res = await request(app).get('/auth/google');
    expect(res.statusCode).toBe(302);
    expect(res.headers.location).toContain('accounts.google.com');
  });
});
