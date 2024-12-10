const cardModel = require('../models/cardModel');

const cardController = {
    getBalance: async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: 'ID de tarjeta es obligatorio' });
            }

            const balance = await cardModel.getBalance(id);
            res.status(200).json({ balance });
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el saldo', error: error.message });
        }
    },

    addBalance: async (req, res) => {
        try {
            const { id } = req.params;
            const { amount } = req.body;

            if (!id || !amount) {
                return res.status(400).json({ message: 'ID de tarjeta y monto son obligatorios' });
            }

            if (amount <= 0) {
                return res.status(400).json({ message: 'El monto debe ser mayor a cero' });
            }

            await cardModel.addBalance(id, amount);
            res.status(200).json({ message: 'Saldo agregado exitosamente' });
        } catch (error) {
            res.status(500).json({ message: 'Error al agregar saldo', error: error.message });
        }
    }
};

module.exports = cardController;
