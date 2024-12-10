const express = require('express');
const router = express.Router();
const CardController = require('../controllers/cardController');

// Rutas existentes...
router.get('/cards', CardController.getAllCards);
router.get('/cards/user/:userId', CardController.getCardsByUserId);
router.post('/cards', CardController.createCard);
router.delete('/cards/:id', CardController.deleteCard);

// Nuevas rutas para saldo
router.get('/card/:cardId/balance', CardController.getBalance);  // Obtener saldo
router.put('/card/:cardId/balance', CardController.updateBalance);  // Actualizar saldo

module.exports = router;
