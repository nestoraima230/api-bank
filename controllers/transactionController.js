const TransactionModel = require('../models/transactionModel');

const transactionController = {
  transferMoney: async (req, res) => {
    const { senderEmail, receiverEmail, amount, description } = req.body;
    try {
      // Llamamos a la función de transferencia y obtenemos el mensaje
      const message = await TransactionModel.transferMoney(
        senderEmail,
        receiverEmail,
        amount,
        description
      );

      // Respondemos con el mensaje de éxito o error
      res.status(200).json({ message }); // 'message' es el resultado de la transferencia
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