const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔨 Iniciando build para Firebase Functions...\n');

// 1. Compilar el backend
console.log('📦 Compilando backend...');
try {
  execSync('npm run build:backend', { stdio: 'inherit' });
  console.log('✅ Backend compilado exitosamente\n');
} catch (error) {
  console.error('❌ Error al compilar el backend:', error.message);
  process.exit(1);
}

// 2. Crear directorio functions/lib si no existe
const functionsLibDir = path.join(__dirname, '..', 'functions', 'lib');
if (!fs.existsSync(functionsLibDir)) {
  fs.mkdirSync(functionsLibDir, { recursive: true });
  console.log('📁 Directorio functions/lib creado\n');
}

// 3. Copiar archivos compilados de backend/dist a functions/lib
const backendDistDir = path.join(__dirname, '..', 'backend', 'dist');
if (!fs.existsSync(backendDistDir)) {
  console.error(
    '❌ No se encontró backend/dist. Asegúrate de que el build se completó correctamente.'
  );
  process.exit(1);
}

console.log('📋 Copiando archivos compilados...');
copyRecursiveSync(backendDistDir, functionsLibDir);
console.log('✅ Archivos copiados exitosamente\n');

// 4. Instalar dependencias en functions
console.log('📥 Instalando dependencias en functions...');
try {
  execSync('npm install', {
    cwd: path.join(__dirname, '..', 'functions'),
    stdio: 'inherit',
  });
  console.log('✅ Dependencias instaladas exitosamente\n');
} catch (error) {
  console.error('❌ Error al instalar dependencias:', error.message);
  process.exit(1);
}

console.log('🎉 Build completado exitosamente!');

// Función auxiliar para copiar directorios recursivamente
function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();

  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}
