import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { roleMiddleware } from '../middlewares/role.middleware';

const router = Router();

router.get('/', authMiddleware, CategoryController.getAll);

router.post(
  '/',
  authMiddleware,
  roleMiddleware('admin'),
  CategoryController.create
);

router.put(
  '/:id',
  authMiddleware,
  roleMiddleware('admin'),
  CategoryController.update
);

router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware('admin'),
  CategoryController.delete
);

export default router;
