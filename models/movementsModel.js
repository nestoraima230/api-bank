const db = require('../config/db'); 

const getMovements = async (userId) => {
  try {
    const query = 'SELECT transaction_id, transaction_date, amount, type, description, balance_after, related_user_id ' +
                  'FROM Transactions ' +
                  'WHERE user_id = ?';
    const [movements] = await db.query(query, [userId]);
    return movements;
  } catch (error) {
    throw new Error('Error al obtener los movimientos');
  }
};

// Esto necesita correcion
const getFilteredMovements = async (userId, date, type) => {
  try {
    let query = 'SELECT transaction_id, transaction_date, amount, transaction_type_id, description, balance_after, related_user_id ' +
                'FROM Transactions ' +
                'WHERE user_id = ?';
    const params = [userId];

    if (date) {
      query += ' AND transaction_date = ?';
      params.push(date);
    }

    if (type && type !== 'all') {
      const typeMap = {
        'income': 1,
        'expense': 2
      };

      const transactionTypeId = typeMap[type];

      if (transactionTypeId) {
        query += ' AND transaction_type_id = ?';
        params.push(transactionTypeId);
      } else {
        throw new Error('Tipo de transacción no válido');
      }
    }

    const [movements] = await db.query(query, params);
    return movements;
  } catch (error) {
    console.error("Error al obtener los movimientos filtrados:", error.message);  
    throw new Error('Error al obtener los movimientos filtrados');
  }
};

module.exports = {
  getMovements,
  getFilteredMovements
};
