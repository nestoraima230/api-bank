const db = require('../config/db');

const cardModel = {
    // Obtener todas las tarjetas
    getAllCards: async () => {
        const [rows] = await db.query('SELECT * FROM Cards');
        return rows;
    },

    // Obtener tarjetas por el ID del usuario
    getCardsByUserId: async (userId) => {
        if (!userId) throw new Error('Se requiere un ID de usuario válido');
        const [rows] = await db.query('SELECT * FROM Cards WHERE user_id = ?', [userId]);
        return rows;
    },

    // Crear una tarjeta
    createCard: async (cardData) => {
        const { user_id, card_number, expiration_date, cvv, account_id, card_type_id } = cardData;

        if (!user_id || !card_number || !expiration_date || !cvv || !account_id || !card_type_id) {
            throw new Error('Todos los campos son obligatorios');
        }

        const [result] = await db.query(
            'INSERT INTO Cards (user_id, card_number, expiration_date, cvv, account_id, card_type_id) VALUES (?, ?, ?, ?, ?, ?)',
            [user_id, card_number, expiration_date, cvv, account_id, card_type_id]
        );
        return result.insertId;
    },

    // Eliminar tarjeta
    deleteCard: async (id) => {
        if (!id) throw new Error('Se requiere un ID de tarjeta válido');
        await db.query('DELETE FROM Cards WHERE id = ?', [id]);
    },

    // Obtener saldo de la tarjeta
    getBalanceByCardId: async (cardId) => {
        if (!cardId) throw new Error('Se requiere un ID de tarjeta válido');

        const [rows] = await db.query(
            `SELECT a.balance
             FROM Accounts a
             JOIN Cards c ON a.account_id = c.account_id
             WHERE c.id = ?`, [cardId]
        );
        if (rows.length === 0) {
            throw new Error('Saldo no encontrado para la tarjeta');
        }
        return rows[0].balance;
    },

    // Actualizar saldo de la tarjeta
    updateBalanceByCardId: async (cardId, amount) => {
        if (!cardId || amount === undefined) {
            throw new Error('Se requieren un ID de tarjeta y un monto');
        }

        const [rows] = await db.query(
            `UPDATE Accounts a
             JOIN Cards c ON a.account_id = c.account_id
             SET a.balance = a.balance + ?
             WHERE c.id = ?`, [amount, cardId]
        );
        if (rows.affectedRows === 0) {
            throw new Error('No se pudo actualizar el saldo');
        }
        return rows;
    },
};

module.exports = cardModel;
