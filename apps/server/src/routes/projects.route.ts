import { authenticateToken } from '@/auth/auth.middleware';
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  updateProject,
} from '@/controllers/projects.controller';
import { validateBody, validateParams } from '@/middleware/validate.middleware';
import { asyncHandler } from '@/utils/async-handlers';
import {
  createProjectSchema,
  idParamSchema,
  updateProjectSchema,
} from '@/validation/projects.schema';
import { Router } from 'express';

const router = Router();

router.get('/', asyncHandler(getAllProjects));
router.get('/:id', validateParams(idParamSchema), asyncHandler(getProjectById));

router.post(
  '/',
  authenticateToken,
  validateBody(createProjectSchema),
  asyncHandler(createProject)
);
router.put(
  '/:id',
  authenticateToken,
  validateParams(idParamSchema),
  validateBody(updateProjectSchema),
  asyncHandler(updateProject)
);
router.delete(
  '/:id',
  authenticateToken,
  validateParams(idParamSchema),
  asyncHandler(deleteProject)
);

export default router;
