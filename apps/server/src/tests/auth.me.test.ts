import app from '@/app';
import { JWT_SECRET } from '@/utils/constants';
import prisma from '@/utils/prisma';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import { describe, expect, it } from 'vitest';

describe('GET /auth/me', () => {
  it('should return user data with valid token', async () => {
    await prisma.user.deleteMany({ where: { email: 'test@example.com' } });

    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        name: 'Test User',
        provider: 'google',
        role: 'user',
      },
    });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: '30m',
    });

    const res = await request(app)
      .get('/auth/me')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('email', 'test@example.com');

    await prisma.user.delete({ where: { email: user.email } });
  });

  it('should return 401 if no token is provided', async () => {
    const res = await request(app).get('/auth/me');
    expect(res.status).toBe(401);
  });
});
