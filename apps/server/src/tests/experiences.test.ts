import app from '@/app';
import { JWT_SECRET } from '@/utils/constants';
import prisma from '@/utils/prisma';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import { beforeAll, describe, expect, it } from 'vitest';

let token: string;
let experienceId: string;

beforeAll(async () => {
  const user = await prisma.user.create({
    data: {
      email: `exp-test-${Date.now()}@example.com`,
      name: 'Test User',
      provider: 'google',
      role: 'admin',
    },
  });

  token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
});

describe('Experience routes', () => {
  it('POST /api/experience → creates a new experience (auth required)', async () => {
    const res = await request(app)
      .post('/api/experience')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Frontend Developer',
        company: 'Awesome Co.',
        description: 'Worked on React apps',
        startDate: '2023-01-01',
        endDate: '2024-01-01',
        location: 'Remote',
        technologies: ['React', 'TypeScript'],
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    experienceId = res.body.id;
  });

  it('GET /api/experience → gets all experiences', async () => {
    const res = await request(app).get('/api/experience');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /api/experience/:id → gets experience by ID', async () => {
    const res = await request(app).get(`/api/experience/${experienceId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', experienceId);
  });

  it('PUT /api/experience/:id → updates experience (auth required)', async () => {
    const res = await request(app)
      .put(`/api/experience/${experienceId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Updated Title',
        company: 'Updated Company',
        startDate: '2023-01-01',
        endDate: '2024-01-01',
      });

    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Updated Title');
  });

  it('DELETE /api/experience/:id → deletes experience (auth required)', async () => {
    const res = await request(app)
      .delete(`/api/experience/${experienceId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(204);
  });

  it('POST /api/experience → fails without auth', async () => {
    const res = await request(app).post('/api/experience').send({
      title: 'Test',
      company: 'Company',
      startDate: '2022-01-01',
      endDate: '2023-01-01',
    });

    expect(res.status).toBe(401);
  });
});
