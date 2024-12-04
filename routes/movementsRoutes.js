const express = require('express');
const router = express.Router();
const movementsController = require('../controllers/movementsController');
const authenticate = require('../middlewares/authenticate'); 


router.get('/movements', authenticate, movementsController.getMovements);


router.get('/movements/filtered', authenticate, movementsController.getFilteredMovements);

module.exports = router;
