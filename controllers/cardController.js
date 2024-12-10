const Card = require('../models/cardModel');

const CardController = {
    // Obtener todas las tarjetas
    getAllCards: async (req, res) => {
        try {
            const cards = await Card.getAllCards();
            res.status(200).json(cards);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener las tarjetas', error: error.message });
        }
    },

    // Obtener tarjetas por el ID del usuario
    getCardsByUserId: async (req, res) => {
        try {
            const { userId } = req.params;
            if (!userId) {
                return res.status(400).json({ message: 'ID de usuario es obligatorio' });
            }

            const cards = await Card.getCardsByUserId(userId);
            if (cards.length === 0) {
                return res.status(404).json({ message: 'No se encontraron tarjetas para este usuario' });
            }
            res.status(200).json(cards);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener las tarjetas del usuario', error: error.message });
        }
    },

    // Crear una tarjeta
    createCard: async (req, res) => {
        try {
            const { user_id, card_number, expiration_date, cvv, account_id, card_type_id } = req.body;

            if (!user_id || !card_number || !expiration_date || !cvv || !account_id || !card_type_id) {
                return res.status(400).json({ message: 'Todos los campos son obligatorios' });
            }

            const cardId = await Card.createCard({ user_id, card_number, expiration_date, cvv, account_id, card_type_id });
            res.status(201).json({ message: 'Tarjeta creada exitosamente', cardId });
        } catch (error) {
            res.status(500).json({ message: 'Error al crear la tarjeta', error: error.message });
        }
    },

    // Eliminar tarjeta
    deleteCard: async (req, res) => {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ message: 'Se requiere un ID de tarjeta válido' });
            }

            await Card.deleteCard(id);
            res.status(200).json({ message: 'Tarjeta eliminada exitosamente' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar la tarjeta', error: error.message });
        }
    },

    // Obtener saldo de la tarjeta
    getBalance: async (req, res) => {
        try {
            const { cardId } = req.params;
            if (!cardId) {
                return res.status(400).json({ message: 'ID de tarjeta es obligatorio' });
            }
            const balance = await Card.getBalanceByCardId(cardId);
            res.status(200).json({ balance });
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el saldo de la tarjeta', error: error.message });
        }
    },

    // Actualizar saldo de la tarjeta
    updateBalance: async (req, res) => {
        try {
            const { cardId } = req.params;
            const { amount } = req.body;

            if (!amount) {
                return res.status(400).json({ message: 'El monto es obligatorio' });
            }

            const result = await Card.updateBalanceByCardId(cardId, amount);
            res.status(200).json({ message: 'Saldo actualizado correctamente' });
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el saldo', error: error.message });
        }
    },
};

module.exports = CardController;
