import { validateBody } from '@/middleware/validate';
import { createUserSchema } from '@/validation/user.schema';
import { NextFunction, Request, Response } from 'express';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('validateBody middleware', () => {
  const next: NextFunction = vi.fn();
  const res = {
    status: vi.fn(() => res),
    json: vi.fn(),
  } as unknown as Response;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls next if body is valid', () => {
    const req = {
      body: { name: 'Matteo', email: 'matteo@example.com', provider: 'google' },
    } as Request;

    validateBody(createUserSchema)(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it('returns 400 if body is invalid', () => {
    const req = {
      body: { name: '', email: 'invalid-email' },
    } as Request;

    validateBody(createUserSchema)(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        errors: expect.any(Object),
      })
    );
    expect(next).not.toHaveBeenCalled();
  });
});
