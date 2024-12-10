const express = require('express');
const router = express.Router();
const CardController = require('../controllers/cardController');

// Rutas para las tarjetas
router.get('/cards', CardController.getAllCards);
router.get('/cards/user/:userId', CardController.getCardsByUserId); // Ruta para obtener tarjetas por userId
router.post('/cards', CardController.createCard);
router.delete('/cards/:id', CardController.deleteCard);

// Rutas para el saldo de las tarjetas
router.get('/card/:cardId/balance', CardController.getBalance);  // Obtener saldo
router.put('/card/:cardId/balance', CardController.updateBalance);  // Actualizar saldo

module.exports = router;
