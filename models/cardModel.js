const db = require('../config/db');

const cardModel = {
    getAllCards: async () => {
        const [rows] = await db.query('SELECT * FROM Cards');
        return rows;
    },

    getCardsByUserId: async (userId) => {
        if (!userId) throw new Error('Se requiere un ID de usuario válido');
        const [rows] = await db.query('SELECT * FROM Cards WHERE user_id = ?', [userId]);
        return rows;
    },

    createCard: async (cardData) => {
        const { user_id, card_number, expiration_date, cvv } = cardData;
        if (!user_id || !card_number || !expiration_date || !cvv) {
            throw new Error('Todos los campos son obligatorios');
        }
        const [result] = await db.query(
            'INSERT INTO Cards (user_id, card_number, expiration_date, cvv) VALUES (?, ?, ?, ?)',
            [user_id, card_number, expiration_date, cvv]
        );
        return result.insertId;
    },

    deleteCard: async (id) => {
        if (!id) throw new Error('Se requiere un ID de tarjeta válido');
        await db.query('DELETE FROM Cards WHERE id = ?', [id]);
    },
};

module.exports = cardModel;
