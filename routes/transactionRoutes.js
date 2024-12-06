const express = require('express');
const router = express.Router();
const TransactionController = require('../controllers/transactionController');


router.post('/transfer', TransactionController.transferMoney); // POST /api/transaction/transfer
router.get('/:userId', TransactionController.getTransactionsByUser);  // GET /api/transaction/1           

module.exports = router;