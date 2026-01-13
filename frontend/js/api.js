import { auth } from './firebase.js';

// Detectar automáticamente el entorno
const isDevelopment =
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1';
const API_BASE_URL = isDevelopment ? 'http://localhost:4000/api' : '/api'; // En producción, usar la misma URL (Firebase Hosting + Functions)

async function getIdToken() {
  const user = auth.currentUser;

  if (!user) {
    throw new Error('Usuario no autenticado');
  }

  return await user.getIdToken();
}

async function request(endpoint, options = {}) {
  const token = await getIdToken();

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error en la API');
  }

  return response.json();
}

export const api = {
  get: (endpoint) => request(endpoint, { method: 'GET' }),

  post: (endpoint, body) =>
    request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  put: (endpoint, body) =>
    request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    }),

  delete: (endpoint) => request(endpoint, { method: 'DELETE' }),
};
