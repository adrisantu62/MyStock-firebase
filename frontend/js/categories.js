import { createCrud } from './crud/crud.service.js';

const categoryCrud = createCrud('categories');

/**
 * Carga categorías desde el backend
 */
export async function loadCategories() {
  try {
    const response = await categoryCrud.getAll();
    renderCategories(response.data);
  } catch (error) {
    console.error('Error cargando categorías:', error.message);
    alert('No se pudieron cargar las categorías');
  }
}

/**
 * Renderiza categorías en el dashboard
 */
function renderCategories(categories) {
  const list = document.getElementById('categories-list');

  if (!list) {
    console.warn('No existe el contenedor #categories-list');
    return;
  }

  list.innerHTML = '';

  if (!categories.length) {
    list.innerHTML = '<p>No hay categorías</p>';
    return;
  }

  categories.forEach((category) => {
    const item = document.createElement('div');
    item.classList.add('category-item');

    item.textContent = category.name;

    list.appendChild(item);
  });
}
