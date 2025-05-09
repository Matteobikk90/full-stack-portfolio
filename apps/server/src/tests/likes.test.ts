import app from '@/app';
import { JWT_SECRET } from '@/utils/constants';
import prisma from '@/utils/prisma';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import { beforeAll, describe, expect, it } from 'vitest';

let token: string;
let projectId: string;
let experienceId: string;

beforeAll(async () => {
  const user = await prisma.user.create({
    data: {
      name: 'Test User',
      email: `like-${Date.now()}@example.com`,
      provider: 'google',
      role: 'user',
    },
  });

  token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

  const project = await prisma.project.create({
    data: {
      title: 'Project Test',
      description: 'Project desc',
      slug: `project-${Date.now()}`,
      technologies: ['Node.js'],
    },
  });

  const experience = await prisma.experience.create({
    data: {
      title: 'Experience Test',
      company: 'Company',
      startDate: new Date('2022-01-01'),
      endDate: new Date('2023-01-01'),
      technologies: ['TypeScript'],
    },
  });

  projectId = project.id;
  experienceId = experience.id;
});

describe('POST /api/likes', () => {
  it('toggles like on a project', async () => {
    const res1 = await request(app)
      .post('/api/likes')
      .set('Authorization', `Bearer ${token}`)
      .send({ projectId });

    expect(res1.status).toBe(201);

    const res2 = await request(app)
      .post('/api/likes')
      .set('Authorization', `Bearer ${token}`)
      .send({ projectId });

    expect(res2.status).toBe(204);
  });

  it('toggles like on an experience', async () => {
    const res1 = await request(app)
      .post('/api/likes')
      .set('Authorization', `Bearer ${token}`)
      .send({ experienceId });

    expect(res1.status).toBe(201);

    const res2 = await request(app)
      .post('/api/likes')
      .set('Authorization', `Bearer ${token}`)
      .send({ experienceId });

    expect(res2.status).toBe(204);
  });

  it('fails without auth', async () => {
    const res = await request(app).post('/api/likes').send({ projectId });
    expect(res.status).toBe(401);
  });

  it('fails without target', async () => {
    const res = await request(app)
      .post('/api/likes')
      .set('Authorization', `Bearer ${token}`)
      .send({});
    expect(res.status).toBe(400);
  });
});
