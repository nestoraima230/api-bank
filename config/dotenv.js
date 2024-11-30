const dotenv = require('dotenv');

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Validar las variables esenciales
const requiredVars = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME', 'DB_PORT', 'JWT_SECRET'];

requiredVars.forEach((varName) => {
  if (!process.env[varName]) {
    console.error(`⚠️  Error: La variable de entorno ${varName} no está configurada en el archivo .env`);
    process.exit(1); // Salir si falta una variable requerida
  }
});

console.log('✅ Variables de entorno cargadas exitosamente.');

module.exports = process.env;
