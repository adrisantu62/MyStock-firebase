import { db } from '../config/firebase';
import { Category } from '../types/category.interface';

const COLLECTION = 'categories';

export class CategoryModel {
  static collection() {
    return db.collection(COLLECTION);
  }

  static async create(data: Omit<Category, 'id'>): Promise<Category> {
    const ref = await this.collection().add(data);

    return { id: ref.id, ...data };
  }

  static async findAll(): Promise<Category[]> {
    const snapshot = await this.collection().where('active', '==', true).get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Category, 'id'>),
    }));
  }

  static async findById(id: string): Promise<Category | null> {
    const doc = await this.collection().doc(id).get();
    if (!doc.exists) return null;

    return {
      id: doc.id,
      ...(doc.data() as Omit<Category, 'id'>),
    };
  }

  static async update(
    id: string,
    data: Partial<Category>
  ): Promise<Category | null> {
    const ref = this.collection().doc(id);
    const doc = await ref.get();
    if (!doc.exists) return null;

    await ref.update(data);
    const updated = await ref.get();

    return {
      id: updated.id,
      ...(updated.data() as Omit<Category, 'id'>),
    };
  }

  static async softDelete(id: string): Promise<boolean> {
    const ref = this.collection().doc(id);
    const doc = await ref.get();
    if (!doc.exists) return false;

    await ref.update({ active: false });
    return true;
  }
}
