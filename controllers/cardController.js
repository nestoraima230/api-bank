const Card = require('../models/cardModel');

const CardController = {
    getAllCards: async (req, res) => {
        try {
            const userId = req.params.userId;  // Asegúrate de que estés obteniendo el parámetro correcto
            const cards = await Card.getAllCards(userId);
            res.status(200).json(cards);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener las tarjetas', error: error.message });
        }
    },
    
    getCardById: async (req, res) => {
        try {
            const { id } = req.params;  // Se espera que el parámetro sea `id`
            if (!id) {
                return res.status(400).json({ message: 'ID de tarjeta es obligatorio' });
            }
            const card = await Card.getCardById(id);
            res.status(200).json(card);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener la tarjeta', error: error.message });
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

    getBalance: async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: 'ID de tarjeta es obligatorio' });
            }

            const balance = await Card.getBalance(id);
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

            await Card.addBalance(id, amount);
            res.status(200).json({ message: 'Saldo agregado exitosamente' });
        } catch (error) {
            res.status(500).json({ message: 'Error al agregar saldo', error: error.message });
        }
    }
};

module.exports = CardController;
