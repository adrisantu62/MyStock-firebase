import { CategoryModel } from '../models/category.model';
import { Category } from '../types/category.interface';
import { BadRequestError, NotFoundError } from '../errors/domain.errors';

export class CategoryService {
  static async create(data: Omit<Category, 'id'>): Promise<Category> {
    if (!data.name) {
      throw new BadRequestError('El nombre es obligatorio');
    }

    return CategoryModel.create(data);
  }

  static async getAll(): Promise<Category[]> {
    return CategoryModel.findAll();
  }

  static async getById(id: string): Promise<Category> {
    const category = await CategoryModel.findById(id);
    if (!category) {
      throw new NotFoundError('Categoría no encontrada');
    }
    return category;
  }

  static async update(id: string, data: Partial<Category>): Promise<Category> {
    const updated = await CategoryModel.update(id, data);
    if (!updated) {
      throw new NotFoundError('Categoría no encontrada');
    }
    return updated;
  }

  static async delete(id: string): Promise<void> {
    const deleted = await CategoryModel.softDelete(id);
    if (!deleted) {
      throw new NotFoundError('Categoría no encontrada');
    }
  }
}
