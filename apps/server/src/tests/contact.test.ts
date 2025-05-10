import app from '@/app';
import request from 'supertest';
import { describe, expect, it } from 'vitest';

describe('POST /api/contact', () => {
  it('should send a contact message and return 201', async () => {
    const res = await request(app).post('/api/contact').send({
      name: 'Matteo Soresini',
      email: 'matteo@example.com',
      message: 'Hello, this is a test message.',
    });

    expect(res.status).toBe(201);
    expect(res.body).toEqual({ message: 'Message sent successfully' });
  });

  it('should return 400 for invalid input', async () => {
    const res = await request(app).post('/api/contact').send({
      name: '',
      email: 'not-an-email',
      message: '',
    });

    expect(res.status).toBe(400);
    expect(res.body.errors).toBeDefined();
  });
});
