const db = require('../config/db');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

const userModel = {

  registerUser: async (first_name, last_name, email, password) => {
    const [results] = await db.execute('CALL REGISTER_USER(?, ?, ?, ?)', [
      first_name,
      last_name,
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
      const [results] = await db.execute('CALL LOGIN_USER(?, ?, @session_token, @user_id, @account_id, @balance, @account_created_at, @account_is_active)', [email, password]);
  
      const [[sessionResult]] = await db.query('SELECT @session_token AS sessionToken, @user_id AS userId, @account_id AS accountId, @balance AS accountBalance, @account_created_at AS accountCreatedAt, @account_is_active AS accountIsActive');
  
      if (!sessionResult || !sessionResult.userId) {
        throw new Error('Correo o contraseña incorrectos');
      }
  
      if (!sessionResult.accountId || sessionResult.accountIsActive === 0) {
        throw new Error('La cuenta bancaria del usuario está desactivada o no existe');
      }
  
      const token = jwt.sign(
        { userId: sessionResult.userId, email, accountId: sessionResult.accountId, accountBalance: sessionResult.accountBalance, accountCreatedAt: sessionResult.accountCreatedAt },
        JWT_SECRET, 
        { expiresIn: JWT_EXPIRES_IN }  
      );
  
      return { 
        message: 'Inicio de sesión exitoso', 
        token,
        accountId: sessionResult.accountId,
        accountBalance: sessionResult.accountBalance,
        accountCreatedAt: sessionResult.accountCreatedAt 
      };
      
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
