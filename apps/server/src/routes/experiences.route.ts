import { authenticateToken } from '@/auth/auth.middleware';
import {
  createExperience,
  deleteExperience,
  getAllExperiences,
  getExperienceById,
  updateExperience,
} from '@/controllers/experinces.controller';
import { validateBody, validateParams } from '@/middleware/validate.middleware';
import {
  createExperienceSchema,
  idParamSchema,
  updateExperienceSchema,
} from '@/validation/experiences.schema';
import { Router } from 'express';

const router = Router();

router.get('/', getAllExperiences);
router.get('/:id', validateParams(idParamSchema), getExperienceById);

// protected
router.post(
  '/',
  authenticateToken,
  validateBody(createExperienceSchema),
  createExperience
);
router.put(
  '/:id',
  authenticateToken,
  validateParams(idParamSchema),
  validateBody(updateExperienceSchema),
  updateExperience
);
router.delete(
  '/:id',
  authenticateToken,
  validateParams(idParamSchema),
  deleteExperience
);

export default router;
