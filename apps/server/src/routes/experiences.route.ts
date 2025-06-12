import {
  getAllExperiences,
  getExperienceById,
} from '@/controllers/experinces.controller';
import { validateParams } from '@/middleware/validate.middleware';
import { asyncHandler } from '@/utils/async-handlers';
import { idParamSchema } from '@/validation/experiences.schema';
import { Router } from 'express';

const router = Router();

router.get('/', asyncHandler(getAllExperiences));
router.get(
  '/:id',
  validateParams(idParamSchema),
  asyncHandler(getExperienceById)
);

export default router;
