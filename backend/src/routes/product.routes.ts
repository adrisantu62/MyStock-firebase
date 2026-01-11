// router.get('/', (_req, res) => {
//   res.json({ message: 'Listado de productos' });
// });

// router.post('/', authMiddleware, roleMiddleware('admin'), (_req, res) => {
//   res.status(201).json({ message: 'Producto creado' });
// });

// router.put('/:id', authMiddleware, roleMiddleware('admin'), (_req, res) => {
//   res.json({ message: 'Producto actualizado' });
// });

// router.delete('/:id', authMiddleware, roleMiddleware('admin'), (_req, res) => {
//   res.json({ message: 'Producto eliminado (soft)' });
// });

import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { roleMiddleware } from '../middlewares/role.middleware';
import { ProductController } from '../controllers/product.controller';

const router = Router();

router.get('/', authMiddleware, ProductController.getAll);
router.get('/:id', authMiddleware, ProductController.getById);

router.post(
  '/',
  authMiddleware,
  roleMiddleware('admin'),
  ProductController.create
);

router.put(
  '/:id',
  authMiddleware,
  roleMiddleware('admin'),
  ProductController.update
);

router.patch(
  '/:id/stock',
  authMiddleware,
  roleMiddleware('admin'),
  ProductController.updateStock
);

router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware('admin'),
  ProductController.delete
);

export default router;
