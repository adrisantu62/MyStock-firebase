import { api } from '../api.js';

/**
 * Factory CRUD genérico para cualquier recurso REST
 * @param {string} resource - nombre del endpoint (products, categories, etc)
 */
export function createCrud(resource) {
  if (!resource) {
    throw new Error('El nombre del recurso es obligatorio');
  }

  return {
    async getAll() {
      return api.get(`/${resource}`);
    },

    async getById(id) {
      if (!id) throw new Error('ID requerido');
      return api.get(`/${resource}/${id}`);
    },

    async create(data) {
      if (!data) throw new Error('Datos requeridos');
      return api.post(`/${resource}`, data);
    },

    async update(id, data) {
      if (!id) throw new Error('ID requerido');
      return api.put(`/${resource}/${id}`, data);
    },

    async remove(id) {
      if (!id) throw new Error('ID requerido');
      return api.del(`/${resource}/${id}`);
    },
  };
}
