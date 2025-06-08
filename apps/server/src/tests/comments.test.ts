import app from '@/app';
import { JWT_SECRET } from '@/utils/constants';
import prisma from '@/utils/prisma';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import { beforeAll, describe, expect, it } from 'vitest';

let token: string;
let userId: string;
let experienceId: string;
let projectId: string;
let commentId: string;

beforeAll(async () => {
  const user = await prisma.user.create({
    data: {
      name: 'Comment Tester',
      email: `comment-${Date.now()}@example.com`,
      provider: 'google',
      role: 'user',
    },
  });
  userId = user.id;
  token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });

  const experience = await prisma.experience.create({
    data: {
      title: 'Experience Test',
      company: 'Company',
      startDate: new Date('2022-01-01'),
      endDate: new Date('2023-01-01'),
      technologies: ['TypeScript'],
      slug: 'experience-test',
      description: 'Experience desc',
      location: 'Remote',
      isRemote: true,
      url: 'https://example.com',
    },
  });
  experienceId = experience.id;

  const project = await prisma.project.create({
    data: {
      title: 'Test Project',
      number: '1',
      demoUrl: 'https://example.com/demo',
      repoUrl: 'https://example.com/demo',
      imageUrl: 'https://example.com/image.png',
      description: 'Test Desc',
      slug: `project-${Date.now()}`,
      technologies: ['React'],
    },
  });
  projectId = project.id;
});

describe('Comment endpoints', () => {
  it('POST /api/comments → create comment on experience', async () => {
    const res = await request(app)
      .post('/api/comments')
      .set('Authorization', `Bearer ${token}`)
      .send({
        content: 'Great job!',
        experienceId,
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    commentId = res.body.id;
  });

  it('POST /api/comments → create comment on project', async () => {
    const res = await request(app)
      .post('/api/comments')
      .set('Authorization', `Bearer ${token}`)
      .send({
        content: 'Awesome work!',
        projectId,
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('PUT /api/comments/:id → update comment', async () => {
    const res = await request(app)
      .put(`/api/comments/${commentId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ content: 'Updated comment' });

    expect(res.status).toBe(200);
    expect(res.body.content).toBe('Updated comment');
  });

  it('DELETE /api/comments/:id → delete comment', async () => {
    const res = await request(app)
      .delete(`/api/comments/${commentId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(204);
  });

  it('POST /api/comments → fails without auth', async () => {
    const res = await request(app).post('/api/comments').send({
      content: 'Should fail',
      experienceId,
    });
    expect(res.status).toBe(401);
  });
});
