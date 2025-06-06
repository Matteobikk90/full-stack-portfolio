import { authenticateToken } from '@/auth/auth.middleware';
import { validateBody } from '@/middleware/validate.middleware';
import { asyncHandler } from '@/utils/async-handlers';
import { createUserSchema } from '@/validation/user.schema';
import { Router } from 'express';

const router = Router();

router.get(
  '/me',
  authenticateToken,
  asyncHandler(async (req, res) => {
    const user = req.user as { userId: string };
    res.json({ userId: user.userId });
  })
);

router.post(
  '/',
  validateBody(createUserSchema),
  asyncHandler(async (req, res) => {
    const { name, email, provider, role } = req.body;
    res.status(201).json({ name, email, provider, role });
  })
);

export default router;
