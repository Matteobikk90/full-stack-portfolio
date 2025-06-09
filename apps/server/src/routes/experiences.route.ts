import { authenticateToken } from '@/auth/auth.middleware';
import {
  createExperience,
  deleteExperience,
  getAllExperiences,
  getExperienceById,
  updateExperience,
} from '@/controllers/experinces.controller';
import { validateBody, validateParams } from '@/middleware/validate.middleware';
import { asyncHandler } from '@/utils/async-handlers';
import {
  createExperienceSchema,
  idParamSchema,
  updateExperienceSchema,
} from '@/validation/experiences.schema';
import { Router } from 'express';

const router = Router();

router.get('/', asyncHandler(getAllExperiences));
router.get(
  '/:id',
  validateParams(idParamSchema),
  asyncHandler(getExperienceById)
);

// protected routes
router.post(
  '/',
  authenticateToken,
  validateBody(createExperienceSchema),
  asyncHandler(createExperience)
);
router.put(
  '/:id',
  authenticateToken,
  validateParams(idParamSchema),
  validateBody(updateExperienceSchema),
  asyncHandler(updateExperience)
);
router.delete(
  '/:id',
  authenticateToken,
  validateParams(idParamSchema),
  asyncHandler(deleteExperience)
);

export default router;
