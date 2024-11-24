const mysql = require('mysql2');
const url = require('url');
require('dotenv').config();

// Analizar la URL de la base de datos
const dbUrl = url.parse(process.env.DATABASE_URL);

const connection = mysql.createConnection({
  host: dbUrl.hostname,
  user: dbUrl.auth.split(':')[0],  // El nombre de usuario (antes de ':')
  password: dbUrl.auth.split(':')[1],  // La contraseña (después de ':')
  database: dbUrl.pathname.split('/')[1],  // El nombre de la base de datos (después de '/')
  port: dbUrl.port // El puerto
});

connection.connect((err) => {
  if (err) {
    console.error('Failed to connect to database:', err);
    return;
  }
  console.log('Successfully connected to the MySQL database');
});
