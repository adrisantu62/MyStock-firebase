import { auth } from './firebase.js';
import { signOut } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { loadProducts } from './products.js';
import { loadCategories } from './categories.js';
import { waitForAuth, getUserRole } from './auth.js';

console.log('Dashboard cargado, esperando auth...');

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const user = await waitForAuth();
    const role = await getUserRole(user);
    // Actualizar nombre de usuario
    const userSpan = document.getElementById('user');
    if (userSpan) {
      userSpan.textContent = `${user.email} - (${role})`;
    }

    await handleRoleVisibility(role);
  } catch (error) {
    console.error(error.message);
    window.location.href = 'index.html';
  }
});

// --- Logout ---
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', async () => {
    await signOut(auth);
    window.location.href = 'index.html';
  });
}

async function handleRoleVisibility(role) {
  const adminSection = document.getElementById('admin-section');
  if (!adminSection) return;

  adminSection.hidden = role !== 'admin';

  loadProducts();

  if (role === 'admin') {
    loadCategories();
  }
}
