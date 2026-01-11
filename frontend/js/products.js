import { createCrud } from './crud/crud.service.js';

const productCrud = createCrud('products');

/**
 * Carga productos desde el backend
 */
export async function loadProducts() {
  try {
    const products = await productCrud.getAll();
    renderProducts(products?.data || []);
  } catch (error) {
    console.error('Error cargando productos:', error.message);
    alert('No se pudieron cargar los productos');
  }
}

/**
 * Renderiza productos en el dashboard
 */
function renderProducts(products) {
  const list = document.getElementById('products-list');

  if (!list) {
    console.warn('No existe el contenedor #products-list');
    return;
  }

  list.innerHTML = '';

  if (!products.length) {
    list.innerHTML = '<p>No hay productos disponibles</p>';
    return;
  }

  products.forEach((product) => {
    const item = document.createElement('div');
    item.classList.add('product-item');

    item.innerHTML = `
      <strong>${product.name}</strong><br />
      Stock: ${product.stock}<br />
      Categoría: ${product.category}
    `;

    list.appendChild(item);
  });
}
