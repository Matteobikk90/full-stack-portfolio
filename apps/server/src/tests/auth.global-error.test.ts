import app from '@/app';
import request from 'supertest';
import { describe, expect, it } from 'vitest';

describe('Global error handler', () => {
  it('should catch unexpected errors and return 500', async () => {
    const res = await request(app).get('/error-test');

    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty('message', 'Internal test error');
  });
});
