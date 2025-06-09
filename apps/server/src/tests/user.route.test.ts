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
        name: 'Test User',
        email: 'test@example.com',
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

    await prisma.user.delete({ where: { id: user.id } });
  });

  it('should return 401 if no token is provided', async () => {
    const res = await request(app).get('/auth/me');
    expect(res.status).toBe(401);
  });
});

describe('POST /api/user', () => {
  it('creates a user with valid input', async () => {
    const res = await request(app).post('/api/user').send({
      name: 'Matteo',
      email: 'matteo@example.com',
      provider: 'google',
      role: 'admin',
    });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      name: 'Matteo',
      email: 'matteo@example.com',
      provider: 'google',
      role: 'admin',
    });
  });

  it('returns 400 with invalid input', async () => {
    const res = await request(app)
      .post('/api/user')
      .send({ name: '', email: 'not-an-email' });

    expect(res.status).toBe(400);
    expect(res.body.errors).toBeDefined();
  });
});
