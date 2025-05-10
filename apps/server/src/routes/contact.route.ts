import { handleContactMessage } from '@/controllers/contact.controller';
import { validateBody } from '@/middleware/validate.middleware';
import { contactMessageSchema } from '@/validation/contact.schema';
import { Router } from 'express';

const router = Router();

router.post('/', validateBody(contactMessageSchema), handleContactMessage);

export default router;
