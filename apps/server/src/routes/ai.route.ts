import { handleAIChat } from '@/controllers/ai.controller';
import { Router } from 'express';

const router = Router();

router.post('/', handleAIChat);

export default router;
