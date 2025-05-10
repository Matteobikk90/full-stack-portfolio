import { authenticateToken } from '@/auth/auth.middleware';
import { toggleLike } from '@/controllers/like.controller';
import { validateBody } from '@/middleware/validate.middleware';
import { asyncHandler } from '@/utils/async-handlers';
import { toggleLikeSchema } from '@/validation/likes.schema';
import { Router } from 'express';

const router = Router();

router.post(
  '/',
  authenticateToken,
  validateBody(toggleLikeSchema),
  asyncHandler(toggleLike)
);

export default router;
