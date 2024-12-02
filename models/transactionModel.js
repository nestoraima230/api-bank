const db = require('../config/db'); 

const TransactionModel = {
  transferMoney: async (senderEmail, receiverEmail, amount, description) => {
    try {
      const [rows] = await db.execute(
        'CALL TRANSFER_MONEY(?, ?, ?, ?)',
        [senderEmail, receiverEmail, amount, description]
      );
      return rows;
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
