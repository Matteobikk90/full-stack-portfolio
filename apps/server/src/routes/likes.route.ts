import { getLikes, toggleLike } from '@/controllers/like.controller';
import { validateBody, validateParams } from '@/middleware/validate.middleware';
import { asyncHandler } from '@/utils/async-handlers';
import { likeSchema } from '@/validation/likes.schema';
import { Router } from 'express';

const router = Router();

router.get('/:projectId', validateParams(likeSchema), asyncHandler(getLikes));

router.post('/', validateBody(likeSchema), asyncHandler(toggleLike));

export default router;
