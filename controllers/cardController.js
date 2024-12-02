const Card = require('../models/cardModel');

const CardController = {

  getAllCards: async (req, res) => {
    try {
      const cards = await Card.getCardsByUserId();
      res.status(200).json(cards);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener tarjetas', error });
    }
  },

  getCardsByUserId: async (req, res) => {
    try {
      const { userId } = req.params;
      const cards = await Card.getCardsByUserId(userId);
      res.status(200).json(cards);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener tarjetas', error });
    }
  },

  createCard: async (req, res) => {
    try {
      const { user_id, card_number, expiration_date, cvv } = req.body;
      const cardId = await Card.createCard({ user_id, card_number, expiration_date, cvv });
      res.status(201).json({ message: 'Tarjeta creada', cardId });
    } catch (error) {
      res.status(500).json({ message: 'Error al crear tarjeta', error });
    }
  },

  deleteCard: async (req, res) => {
    try {
      const { id } = req.params;
      await Card.deleteCard(id);
      res.status(200).json({ message: 'Tarjeta eliminada' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar tarjeta', error });
    }
  },
};

module.exports = CardController;