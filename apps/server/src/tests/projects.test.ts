import app from '@/app';
import { JWT_SECRET } from '@/utils/constants';
import prisma from '@/utils/prisma';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import { beforeAll, describe, expect, it } from 'vitest';

let token: string;
let projectId: string;

beforeAll(async () => {
  const user = await prisma.user.create({
    data: {
      email: `proj-test-${Date.now()}@example.com`,
      name: 'Test Admin',
      provider: 'google',
      role: 'admin',
    },
  });

  token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
});

describe('Project routes', () => {
  it('POST /api/projects → creates a new project (auth required)', async () => {
    const res = await request(app)
      .post('/api/projects')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Portfolio App',
        description: 'A full-stack portfolio project',
        slug: `portfolio-app-${Date.now()}`,
        repoUrl: 'https://github.com/you/portfolio',
        demoUrl: 'https://yourportfolio.com',
        technologies: ['React', 'Prisma'],
        isFeatured: true,
      });
    console.log('Reshggfhvjbknmghfvjbknmfghvbjnkponse:', res.body);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    projectId = res.body.id;
  });

  it('GET /api/projects → gets all projects', async () => {
    const res = await request(app).get('/api/projects');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /api/projects/:id → gets project by ID', async () => {
    const res = await request(app).get(`/api/projects/${projectId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', projectId);
  });

  it('PUT /api/projects/:id → updates project (auth required)', async () => {
    const res = await request(app)
      .put(`/api/projects/${projectId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Updated Project Title',
        description: 'Updated description',
      });

    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Updated Project Title');
  });

  it('DELETE /api/projects/:id → deletes project (auth required)', async () => {
    const res = await request(app)
      .delete(`/api/projects/${projectId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(204);
  });

  it('POST /api/projects → fails without auth', async () => {
    const res = await request(app)
      .post('/api/projects')
      .send({
        title: 'Unauthorized Project',
        description: 'Should not be created',
        slug: 'unauthorized-project',
        technologies: ['Express'],
      });

    expect(res.status).toBe(401);
  });
});
