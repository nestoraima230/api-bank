const TransactionModel = require('../models/transactionModel');

const transactionController = {
  transferMoney: async (req, res) => {
    const { senderEmail, receiverEmail, amount, description } = req.body;
    try {
      const result = await TransactionModel.transferMoney(
        senderEmail,
        receiverEmail,
        amount,
        description
      );
      res.status(200).json({ message: 'Transferencia realizada exitosamente', result });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getTransactionsByUser: async (req, res) => {
    const { userId } = req.params;
    try {
      const transactions = await TransactionModel.getTransactionsByUserId(userId);
      res.status(200).json(transactions);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = transactionController;
