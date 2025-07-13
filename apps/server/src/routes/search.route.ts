import { handleSearch } from '@/controllers/search.controller';
import { validateQuery } from '@/middleware/validate.middleware';
import { asyncHandler } from '@/utils/async-handlers';
import { filterSchema } from '@/validation/search.schema';
import { Router } from 'express';

const router = Router();

router.get('/', validateQuery(filterSchema), asyncHandler(handleSearch));

export default router;
