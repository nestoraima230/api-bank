const dotenv = require('dotenv');

dotenv.config();

const requiredVars = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME', 'DB_PORT', 'JWT_SECRET'];

requiredVars.forEach((varName) => {
  if (!process.env[varName]) {
    console.error(` ${varName} is not configured`);
    process.exit(1); 
  }
});

console.log('Enviroment variables charged');

module.exports = process.env;
