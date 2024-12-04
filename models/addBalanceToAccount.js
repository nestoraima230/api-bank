const db = require('../config/db');  

const addBalanceToAccount = async (userId, amount) => {
    try {
        const [result] = await db.query(
            'UPDATE Accounts SET balance = balance + ? WHERE user_id = ? AND is_active = TRUE',
            [amount, userId]
        );
        return result.affectedRows > 0;  
    } catch (error) {
        throw new Error('Error al actualizar el saldo de la cuenta: ' + error.message);
    }
};

const addBalanceToCard = async (userId, cardId, amount) => {
    try {
        const [result] = await db.query(
            'UPDATE Cards SET balance = balance + ? WHERE user_id = ? AND card_id = ?',
            [amount, userId, cardId]
        );
        return result.affectedRows > 0;  
    } catch (error) {
        throw new Error('Error al actualizar el saldo de la tarjeta: ' + error.message);
    }
};

module.exports = {
    addBalanceToAccount,
    addBalanceToCard
};
