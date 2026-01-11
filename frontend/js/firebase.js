// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Import Firebase SDKs desde CDN (sin bundler)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

// ⚠️ Reemplazar con la config real del proyecto
const firebaseConfig = {
  apiKey: 'AIzaSyDhSHcMNuEf1hJG3bMm6a9pf2ZFid-HhgA',
  authDomain: 'mystock-1d24c.firebaseapp.com',
  projectId: 'mystock-1d24c',
  storageBucket: 'mystock-1d24c.firebasestorage.app',
  messagingSenderId: '38182108038',
  appId: '1:38182108038:web:ab5a263f760151800f8a07',
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Auth
export const auth = getAuth(app);
