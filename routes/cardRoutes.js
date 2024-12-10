const express = require('express');
const router = express.Router();
const CardController = require('../controllers/cardController');

// Ruta para obtener todas las tarjetas de un usuario
router.get('/user/:userId', CardController.getAllCards); // Cambié el parámetro para que sea más claro

// Ruta para obtener una tarjeta por su ID
router.get('/:id', CardController.getCardById); // Mantén esta ruta para obtener una tarjeta específica

// Ruta para crear una nueva tarjeta
router.post('/', CardController.createCard);

// Ruta para eliminar una tarjeta por su ID
router.delete('/:id', CardController.deleteCard);

router.get('/:id/balance', CardController.getBalance);

router.post('/:id/balance', CardController.addBalance);

module.exports = router;
