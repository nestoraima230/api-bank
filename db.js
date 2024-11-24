const mysql = require('mysql2');
const url = require('url');
require('dotenv').config();

// Crear pool de conexiones en lugar de una única conexión
const dbUrl = url.parse(process.env.DATABASE_URL);
const pool = mysql.createPool({
  host: dbUrl.hostname,
  user: dbUrl.auth.split(':')[0],
  password: dbUrl.auth.split(':')[1],
  database: dbUrl.pathname.split('/')[1],
  port: dbUrl.port,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Convertir a promesas para mejor manejo de errores
const promisePool = pool.promise();

// Función para probar la conexión
const testConnection = async () => {
  try {
    const [rows] = await promisePool.query('SELECT 1');
    console.log('Database connection successful');
    return true;
  } catch (err) {
    console.error('Database connection failed:', err);
    return false;
  }
};

module.exports = { pool: promisePool, testConnection };