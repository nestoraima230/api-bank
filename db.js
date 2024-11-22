const mysql = require('mysql2');
require('dotenv').config();  

const connection = mysql.createConnection(process.env.DATABASE_URL);

connection.connect((err) => {
  if (err) {
    console.error('Failed to connect to database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});

module.exports = connection;
