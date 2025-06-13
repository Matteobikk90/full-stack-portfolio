import { getAllProjects } from '@/controllers/projects.controller';
import { asyncHandler } from '@/utils/async-handlers';
import { Router } from 'express';

const router = Router();

router.get('/', asyncHandler(getAllProjects));

export default router;
