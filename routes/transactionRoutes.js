const express = require('express');
const router = express.Router();
const TransactionController = require('../controllers/transactionController');


router.post('/transfer', TransactionController.transferMoney); // POST /api/transaction/transfer
router.get('/', TransactionController.getTransactionsByUser);  // GET /api/transaction/           

module.exports = router;