const Card = require('../models/cardModel');

const CardController = {
    getAllCards: async (req, res) => {
        try {
            const cards = await Card.getAllCards();
            res.status(200).json(cards);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener las tarjetas', error: error.message });
        }
    },

    getCardsByUserId: async (req, res) => {
        try {
            const { userId } = req.params;
            if (!userId) {
                return res.status(400).json({ message: 'ID de usuario es obligatorio' });
            }
            const cards = await Card.getCardsByUserId(userId);
            res.status(200).json(cards);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener las tarjetas del usuario', error: error.message });
        }
    },

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
};

module.exports = CardController;