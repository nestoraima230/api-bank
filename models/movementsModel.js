const db = require('../config/db'); // Asegúrate de que tu archivo de conexión a la base de datos esté configurado correctamente

// Obtener los movimientos de un usuario
const getMovements = async (userId) => {
  try {
    const query = 'SELECT date, amount, type, description FROM Transactions WHERE user_id = ?';
    const [movements] = await db.query(query, [userId]);
    return movements;
  } catch (error) {
    throw new Error('Error al obtener los movimientos');
  }
};

// Obtener movimientos filtrados por fecha y tipo
const getFilteredMovements = async (userId, date, type) => {
  try {
    let query = 'SELECT date, amount, type, description FROM Transactions WHERE user_id = ?';
    const params = [userId];

    if (date) {
      query += ' AND date = ?';
      params.push(date);
    }

    if (type && type !== 'all') {
      query += ' AND type = ?';
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
