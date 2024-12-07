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

const getFilteredMovements = async (userId, date, type) => {
  try {
    let query = 'SELECT transaction_id, transaction_date, amount, type, description, balance_after, related_user_id ' +
                'FROM Transactions ' +
                'WHERE user_id = ?';
    const params = [userId];

    if (date) {
      query += ' AND transaction_date = ?';
      params.push(date);
    }

    if (type && type !== 'all') {
      query += ' AND transaction_type_id = ?';
      params.push(type);
    }

    const [movements] = await db.query(query, params);
    return movements;
  } catch (error) {
    throw new Error('Error al obtener los movimientos filtrados');
  }
};

module.exports = {
  getMovements,
  getFilteredMovements
};
