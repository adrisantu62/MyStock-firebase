import { auth } from './firebase.js';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

// --- Google Login ---
const googleBtn = document.getElementById('google-login-btn');
if (googleBtn) {
  googleBtn.addEventListener('click', () => {
    googleBtn.classList.add('loading');
    googleBtn.disabled = true;
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log('Token:', token);

        if (result?.user) {
          console.log(result.user);
          window.location.href = 'dashboard.html';
        }
      })
      .catch((error) => {
        console.error('Error popup Google', error);
        alert('Error al iniciar sesión con Google');
      })
      .finally(() => {
        googleBtn.disabled = false;
        googleBtn.classList.remove('loading');
      });
  });
}

// --- Email / Password Login ---
const emailForm = document.getElementById('email-login-form');
if (emailForm) {
  emailForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = 'dashboard.html';
    } catch (error) {
      console.error('Error login email', error);
      alert('Credenciales inválidas');
    }
  });
}

/**
 * Devuelve el rol del usuario autenticado
 */
export async function getUserRole() {
  const user = auth.currentUser;
  if (!user) return null;

  const tokenResult = await user.getIdTokenResult();
  return tokenResult.claims.role || 'user';
}

/**
 * Espera a que Firebase detecte el usuario autenticado
 */
export function waitForAuth() {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();

      if (!user) {
        reject(new Error('Usuario no autenticado'));
      } else {
        resolve(user);
      }
    });
  });
}
