const db = require('../config/db');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

const userModel = {

  registerUser: async (firstName, lastName, email, password) => {
    const [results] = await db.execute('CALL REGISTER_USER(?, ?, ?, ?)', [
      firstName,
      lastName,
      email,
      password,
    ]);

    if (results && results.length > 0 && results[0].length > 0) {
      const message = results[0][0]?.message;
      return { message };  
    } else {
      throw new Error('No se ha recibido un mensaje de la base de datos');
    }
  },

  loginUser: async (email, password) => {
    try {

      const [results] = await db.execute('CALL LOGIN_USER(?, ?, @session_token, @user_id)', [email, password]);

      const [[sessionResult]] = await db.query('SELECT @session_token AS sessionToken, @user_id AS userId');

      if (!sessionResult || !sessionResult.userId) {
        throw new Error('Correo o contraseña incorrectos');
      }

      const token = jwt.sign(
        { userId: sessionResult.userId, email },  
        JWT_SECRET, 
        { expiresIn: JWT_EXPIRES_IN }  
      );

      return { message: 'Inicio de sesión exitoso', token };  
    } catch (error) {
      console.error('Error en loginUser:', error.message);
      throw new Error('Correo o contraseña incorrectos');
    }
  },

  validateToken: (token) => {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return decoded;
    } catch (error) {
      throw new Error('Token no válido o expirado');
    }
  },
};

module.exports = userModel;
