const express = require('express');
const router = express.Router();
const balanceController = require('../controllers/balanceController');

router.post('/add-balance', balanceController.addBalance);

module.exports = router;
