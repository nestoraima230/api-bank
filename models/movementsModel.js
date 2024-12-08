const db = require('../config/db');

const getMovements = async (userId) => {
  try {
    const query = `
      SELECT transaction_id, transaction_date, amount, transaction_type_id, description, balance_after, related_user_id 
      FROM Transactions 
      WHERE user_id = ?;
    `;
    console.log('Ejecutando consulta:', query, 'con userId:', userId);
    const [movements] = await db.query(query, [userId]);
    return movements;
  } catch (error) {
    console.error('Error al obtener los movimientos:', error.message);
    throw new Error('Error al obtener los movimientos');
  }
};

const getFilteredMovements = async (userId, date, type) => {
  try {
    let query = `
      SELECT transaction_id, transaction_date, amount, transaction_type_id, description, balance_after, related_user_id 
      FROM Transactions 
      WHERE user_id = ? 
    `;
    const params = [userId];

    if (date) {
      query += 'AND DATE(transaction_date) = ? ';
      params.push(date);
    }

    if (type && type !== 'all') {
      query += 'AND transaction_type_id = ? ';
      const typeMap = { income: 1, expense: 2, transfer: 3 };
      const transactionTypeId = typeMap[type];
      if (transactionTypeId) {
        params.push(transactionTypeId);
      } else {
        console.error('Tipo de transacción no válido:', type);
        throw new Error('Tipo de transacción no válido');
      }
    }

    console.log('Ejecutando consulta:', query, 'con parámetros:', params);
    const [movements] = await db.query(query, params);
    return movements;
  } catch (error) {
    console.error('Error al obtener los movimientos filtrados:', error.message);
    throw new Error('Error al obtener los movimientos filtrados');
  }
};

module.exports = {
  getMovements,
  getFilteredMovements
};
