import 'dotenv/config';

import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';

import { CreateCategoryDTO } from '../types/category.dto';
import { CreateProductDTO } from '../types/product.dto';

async function seed() {
  console.log('🌱 Iniciando seed...');

  const now = new Date();

  // ===== Categorías =====
  const electronicsDTO: CreateCategoryDTO = {
    name: 'Electrónica',
    description: 'Productos electrónicos',
  };

  const foodDTO: CreateCategoryDTO = {
    name: 'Alimentos',
    description: 'Productos alimenticios',
  };

  const electronics = await CategoryService.create({
    ...electronicsDTO,
    active: true,
    createdAt: now as any,
    updatedAt: now as any,
  });

  const food = await CategoryService.create({
    ...foodDTO,
    active: true,
    createdAt: now as any,
    updatedAt: now as any,
  });

  // ===== Productos =====
  const notebookDTO: CreateProductDTO = {
    name: 'Notebook',
    description: 'Notebook 15 pulgadas',
    price: 1200,
    stock: 10,
    categoryId: electronics.id,
  };

  const mouseDTO: CreateProductDTO = {
    name: 'Mouse',
    description: 'Mouse inalámbrico',
    price: 25,
    stock: 50,
    categoryId: electronics.id,
  };

  const yerbaDTO: CreateProductDTO = {
    name: 'Yerba',
    description: 'Yerba mate 1kg',
    price: 5,
    stock: 30,
    categoryId: food.id,
  };

  await ProductService.createProduct({
    ...notebookDTO,
    active: true,
    createdAt: now as any,
    updatedAt: now as any,
  });

  await ProductService.createProduct({
    ...mouseDTO,
    active: true,
    createdAt: now as any,
    updatedAt: now as any,
  });

  await ProductService.createProduct({
    ...yerbaDTO,
    active: true,
    createdAt: now as any,
    updatedAt: now as any,
  });

  console.log('✅ Seed finalizado correctamente');
  process.exit(0);
}

seed().catch((error) => {
  console.error('❌ Error en seed:', error);
  process.exit(1);
});
