const db = require('../config/db');

const cardModel = {
    getCardById: async (cardId) => {
        const [rows] = await db.query('SELECT * FROM Cards WHERE id = ?', [cardId]);
        return rows[0];
    },

    getBalance: async (cardId) => {
        const [rows] = await db.query('SELECT balance FROM Cards WHERE id = ?', [cardId]);
        if (rows.length === 0) {
            throw new Error('Tarjeta no encontrada');
        }
        return rows[0].balance;
    },

    addBalance: async (cardId, amount) => {
        const [result] = await db.query(
            'UPDATE Cards SET balance = balance + ? WHERE id = ?',
            [amount, cardId]
        );
        if (result.affectedRows === 0) {
            throw new Error('No se pudo actualizar el saldo. Tarjeta no encontrada.');
        }
    },

    // Nuevo método para obtener todas las tarjetas de un usuario
    getAllCards: async (userId) => {
        const [rows] = await db.query('SELECT * FROM Cards WHERE user_id = ?', [userId]);
        if (rows.length === 0) {
            throw new Error('No se encontraron tarjetas para este usuario');
        }
        return rows;
    }
};

module.exports = cardModel;
