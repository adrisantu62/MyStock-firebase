import { Request, Response, NextFunction } from 'express';
import { CategoryService } from '../services/category.service';
import { getParamAsString } from '../utils/request.utils';
import { CreateCategoryDTO, UpdateCategoryDTO } from '../types/category.dto';

export class CategoryController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await CategoryService.getAll();
      res.status(200).json({ data: categories });
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto: CreateCategoryDTO = req.body;

      const category = await CategoryService.create({
        ...dto,
        active: true,
        createdAt: new Date() as any,
        updatedAt: new Date() as any,
      });

      res.status(201).json({ data: category });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = getParamAsString(req.params.id, 'id');
      const dto: UpdateCategoryDTO = req.body;

      const category = await CategoryService.update(id, {
        ...dto,
        updatedAt: new Date() as any,
      });

      res.status(200).json({ data: category });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = getParamAsString(req.params.id, 'id');
      await CategoryService.delete(id);

      res.status(200).json({ message: 'Categoría eliminada' });
    } catch (error) {
      next(error);
    }
  }
}
