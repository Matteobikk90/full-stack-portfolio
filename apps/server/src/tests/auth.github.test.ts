import app from '@/app';
import request from 'supertest';
import { describe, expect, it } from 'vitest';

describe('GET /auth/github', () => {
  it('should redirect to GitHub OAuth', async () => {
    const res = await request(app).get('/auth/github');

    expect(res.statusCode).toBe(302);
    expect(res.headers.location).toContain('github.com/login/oauth');
  });
});
