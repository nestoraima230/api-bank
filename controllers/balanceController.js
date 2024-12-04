const balanceModel = require('../models/balanceModel');

const addBalance = async (req, res) => {
    const { userId, amount, accountId, cardId } = req.body;  
    
    if (!userId || !amount || amount <= 0) {
        return res.status(400).json({ message: 'Se requiere un monto válido' });
    }

    try {
        let result;
        if (accountId) {
            result = await balanceModel.addBalanceToAccount(userId, amount);
        } else if (cardId) {

            result = await balanceModel.addBalanceToCard(userId, cardId, amount);
        } else {
            return res.status(400).json({ message: 'Debe especificar una cuenta o tarjeta' });
        }

        if (result) {
            return res.status(200).json({ message: 'Saldo añadido exitosamente' });
        } else {
            return res.status(400).json({ message: 'Error al añadir saldo' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};

module.exports = {
    addBalance
};
