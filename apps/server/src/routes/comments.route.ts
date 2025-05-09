import { authenticateToken } from '@/auth/auth.middleware';
import {
  createComment,
  deleteComment,
  updateComment,
} from '@/controllers/comments.controller';
import { validateBody, validateParams } from '@/middleware/validate.middleware';
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
  createComment
);
router.put(
  '/:id',
  authenticateToken,
  validateParams(idParamSchema),
  validateBody(updateCommentSchema),
  updateComment
);
router.delete(
  '/:id',
  authenticateToken,
  validateParams(idParamSchema),
  deleteComment
);

export default router;
