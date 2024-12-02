const express = require('express');
const router = express.Router();
const CardController = require('../controllers/cardController');

router.get('/', CardController.getAllCards);  // /api/cards/
router.get('/:userId', CardController.getCardsByUserId);  // /api/cards/123
router.post('/', CardController.createCard);  // /api/cards/
router.delete('/:id', CardController.deleteCard);  // /api/cards/456

module.exports = router;
