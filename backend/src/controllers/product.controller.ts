import { Request, Response, NextFunction } from 'express';
import { ProductService } from '../services/product.service';
import { CreateProductDTO, UpdateProductDTO } from '../types/product.dto';
import { BadRequestError, NotFoundError } from '../errors/domain.errors';
import { getParamAsString } from '../utils/request.utils';

export class ProductController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { categoryId, active } = req.query;

      const products = await ProductService.getProducts({
        categoryId: categoryId as string | undefined,
        active: active !== undefined ? active === 'true' : undefined,
      });

      res.status(200).json({ data: products });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = getParamAsString(req.params.id, 'id');

      const product = await ProductService.getProductById(id);

      res.status(200).json({ data: product });
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto: CreateProductDTO = req.body;

      const product = await ProductService.createProduct({
        ...dto,
        active: true,
        createdAt: new Date() as any,
        updatedAt: new Date() as any,
      });

      res.status(201).json({ data: product });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = getParamAsString(req.params.id, 'id');
      const dto: UpdateProductDTO = req.body;

      const product = await ProductService.updateProduct(id, {
        ...dto,
        updatedAt: new Date() as any,
      });

      res.status(200).json({ data: product });
    } catch (error) {
      next(error);
    }
  }

  static async updateStock(req: Request, res: Response, next: NextFunction) {
    try {
      const id = getParamAsString(req.params.id, 'id');
      const { stock } = req.body;

      const product = await ProductService.updateStock(id, stock);

      res.status(200).json({ data: product });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = getParamAsString(req.params.id, 'id');

      await ProductService.deleteProduct(id);

      res.status(200).json({ message: 'Producto eliminado' });
    } catch (error) {
      next(error);
    }
  }
}
