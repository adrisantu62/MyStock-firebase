import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { healthCheck } from '../controllers/health.controller';

const router = Router();

router.get('/health', authMiddleware, healthCheck);

export default router;
