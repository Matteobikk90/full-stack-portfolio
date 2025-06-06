import { authenticateToken } from '@/auth/auth.middleware';
import {
  createComment,
  deleteComment,
  updateComment,
} from '@/controllers/comments.controller';
import { validateBody, validateParams } from '@/middleware/validate.middleware';
import { asyncHandler } from '@/utils/async-handlers';
import {
  createCommentSchema,
  idParamSchema,
  updateCommentSchema,
} from '@/validation/comments.schema';
import { Router } from 'express';

const router = Router();

router.post(
  '/',
  authenticateToken,
  validateBody(createCommentSchema),
  asyncHandler(createComment)
);
router.put(
  '/:id',
  authenticateToken,
  validateParams(idParamSchema),
  validateBody(updateCommentSchema),
  asyncHandler(updateComment)
);
router.delete(
  '/:id',
  authenticateToken,
  validateParams(idParamSchema),
  asyncHandler(deleteComment)
);

export default router;
