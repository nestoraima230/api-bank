const express = require('express');
const router = express.Router();
const CardController = require('../controllers/cardController');

router.get('/', CardController.getAllCards);

router.get('/:userId', CardController.getCardsByUserId);

router.post('/', CardController.createCard);

router.delete('/:id', CardController.deleteCard);

module.exports = router;
