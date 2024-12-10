const db = require('../config/db');

const Card = {
    getCardById: async (cardId) => {
        const [rows] = await db.query('SELECT * FROM Cards WHERE user_id = ?', [cardId]);
        return rows[0];
    },

    getBalance: async (cardId) => {
        const [rows] = await db.query('SELECT balance FROM Cards WHERE user_id = ?', [cardId]);
        if (rows.length === 0) {
            throw new Error('Tarjeta no encontrada');
        }
        return rows[0].balance;
    },

    addBalance: async (cardId, amount) => {
        const [result] = await db.query(
            'UPDATE Cards SET balance = balance + ? WHERE user_id = ?',
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
    },

    // Método para crear una tarjeta
    createCard: async (cardData) => {
        const { user_id, card_number, expiration_date, cvv, account_id, card_type_id } = cardData;
        const [result] = await db.query(
            'INSERT INTO Cards (user_id, card_number, expiration_date, cvv, account_id, card_type_id) VALUES (?, ?, ?, ?, ?, ?)',
            [user_id, card_number, expiration_date, cvv, account_id, card_type_id]
        );
        return result.insertId;
    },

    deleteCard: async (cardId) => {
        await db.query('DELETE FROM Cards WHERE id = ?', [cardId]);
    }
};

module.exports = Card;
