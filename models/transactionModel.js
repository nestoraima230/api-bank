const db = require('../config/db'); 

const TransactionModel = {
  transferMoney: async (senderEmail, receiverEmail, amount, description) => {
    try {
      // Llamada a la función TRANSFER_MONEY, incluyendo el parámetro de salida p_message
      const [rows] = await db.execute(
        'CALL TRANSFER_MONEY(?, ?, ?, ?)', // Modificación aquí para incluir @message
        [senderEmail, receiverEmail, amount, description]
      );

      // Obtener el mensaje de salida
      const [[messageRow]] = await db.execute('SELECT @message AS message');
      return messageRow.message; // Devolvemos el mensaje de la transferencia
    } catch (error) {
      throw new Error(error.message || 'Error al realizar la transferencia');
    }
  },

  getTransactionsByUserId: async (userId) => {
    try {
      const [rows] = await db.execute('CALL GetTransactionsByUser(?)', [userId]);
      return rows[0]; 
    } catch (error) {
      throw new Error(error.message || 'Error al obtener las transacciones');
    }
  },
};

module.exports = TransactionModel;