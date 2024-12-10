const express = require('express');
const router = express.Router();
const CardController = require('../controllers/cardController');

router.get('/:userId', CardController.getAllCards);

router.get('/:id', CardController.getCardById);

router.post('/', CardController.createCard);

router.delete('/:id', CardController.deleteCard);

router.get('/:id/balance', CardController.getBalance);

router.post('/:id/balance', CardController.addBalance);

module.exports = router;
