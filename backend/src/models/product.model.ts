import { db } from '../config/firebase';
import { Product } from '../types/product.interface';

const COLLECTION_NAME = 'products';

export class ProductModel {
  static collection() {
    return db.collection(COLLECTION_NAME);
  }

  // Crear producto
  static async create(data: Omit<Product, 'id'>): Promise<Product> {
    const docRef = await this.collection().add(data);

    return {
      id: docRef.id,
      ...data,
    };
  }

  // Obtener todos (con filtros simples)
  static async findAll(filters?: {
    categoryId?: string;
    active?: boolean;
  }): Promise<Product[]> {
    let query: FirebaseFirestore.Query = this.collection();

    if (filters?.categoryId) {
      query = query.where('categoryId', '==', filters.categoryId);
    }

    if (filters?.active !== undefined) {
      query = query.where('active', '==', filters.active);
    }

    const snapshot = await query.get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Product, 'id'>),
    }));
  }

  // Buscar por ID
  static async findById(id: string): Promise<Product | null> {
    const doc = await this.collection().doc(id).get();

    if (!doc.exists) return null;

    return {
      id: doc.id,
      ...(doc.data() as Omit<Product, 'id'>),
    };
  }

  // Actualizar producto
  static async update(
    id: string,
    data: Partial<Product>
  ): Promise<Product | null> {
    const ref = this.collection().doc(id);
    const doc = await ref.get();

    if (!doc.exists) return null;

    await ref.update(data);

    const updated = await ref.get();

    return {
      id: updated.id,
      ...(updated.data() as Omit<Product, 'id'>),
    };
  }

  // Actualizar solo stock
  static async updateStock(id: string, stock: number): Promise<Product | null> {
    return this.update(id, { stock });
  }

  // Soft delete
  static async softDelete(id: string): Promise<boolean> {
    const ref = this.collection().doc(id);
    const doc = await ref.get();

    if (!doc.exists) return false;

    await ref.update({ active: false });

    return true;
  }
}
