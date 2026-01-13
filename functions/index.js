const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Inicializar Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp();
}

// Importar la app de Express compilada
// Manejar tanto export default como module.exports
let app;
try {
  app = require('./lib/app').default || require('./lib/app');
} catch (error) {
  console.error('Error al importar app:', error);
  throw error;
}

// Exportar como Cloud Function
exports.api = functions.https.onRequest(app);
