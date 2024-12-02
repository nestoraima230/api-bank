const PaymentModel = require('../models/paymentModel');

const paymentController = {
  makePayment: async (req, res) => {
    const { userId, paymentMethodId, amount, description, cardId } = req.body;

    try {
      const result = await PaymentModel.makePayment(userId, paymentMethodId, amount, description, cardId);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = paymentController;
