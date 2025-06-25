import { authenticateToken } from '@/auth/auth.middleware';
import { handleAIChat } from '@/controllers/ai.controller';
import { authRateLimiter } from '@/middleware/rate-limit.middleware';
import { validateBody } from '@/middleware/validate.middleware';
import { asyncHandler } from '@/utils/async-handlers';
import { aiMessageSchema } from '@/validation/ai.schema';
import { Router } from 'express';

const router = Router();

router.post(
  '/',
  authenticateToken,
  authRateLimiter,
  validateBody(aiMessageSchema),
  asyncHandler(handleAIChat)
);

export default router;
