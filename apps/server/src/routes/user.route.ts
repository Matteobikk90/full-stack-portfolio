import { validateBody } from '@/middleware/validate.middleware';
import { asyncHandler } from '@/utils/async-handlers';
import { createUserSchema } from '@/validation/user.schema';
import { Router } from 'express';

const router = Router();

router.post(
  '/',
  validateBody(createUserSchema),
  asyncHandler(async (req, res) => {
    const { name, email, provider, role } = req.body;
    res.status(201).json({ name, email, provider, role });
  })
);

export default router;
