import { ProductModel } from '../models/product.model';
import { Product } from '../types/product.interface';
import { BadRequestError, NotFoundError } from '../errors/domain.errors';

export class ProductService {
  // Crear producto
  static async createProduct(data: Omit<Product, 'id'>): Promise<Product> {
    if (!data.name) {
      throw new BadRequestError('El nombre es obligatorio');
    }

    if (data.stock < 0) {
      throw new BadRequestError('El stock no puede ser negativo');
    }

    return ProductModel.create(data);
  }

  // Obtener productos con filtros
  static async getProducts(filters?: {
    categoryId?: string;
    active?: boolean;
  }): Promise<Product[]> {
    return ProductModel.findAll(filters);
  }

  // Obtener producto por ID
  static async getProductById(id: string): Promise<Product> {
    const product = await ProductModel.findById(id);

    if (!product) {
      throw new NotFoundError('Producto no encontrado');
    }

    return product;
  }

  // Actualizar producto
  static async updateProduct(
    id: string,
    data: Partial<Product>
  ): Promise<Product> {
    if (data.stock !== undefined && data.stock < 0) {
      throw new BadRequestError('El stock no puede ser negativo');
    }

    const updated = await ProductModel.update(id, data);

    if (!updated) {
      throw new NotFoundError('Producto no encontrado');
    }

    return updated;
  }

  // Actualizar solo stock
  static async updateStock(id: string, stock: number): Promise<Product> {
    if (stock < 0) {
      throw new BadRequestError('El stock no puede ser negativo');
    }

    const updated = await ProductModel.updateStock(id, stock);

    if (!updated) {
      throw new NotFoundError('Producto no encontrado');
    }

    return updated;
  }

  // Soft delete
  static async deleteProduct(id: string): Promise<void> {
    const deleted = await ProductModel.softDelete(id);

    if (!deleted) {
      throw new NotFoundError('Producto no encontrado');
    }
  }
}
