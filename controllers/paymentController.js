const PaymentModel = require('../models/paymentModel');

const paymentController = {
  makePayment: async (req, res) => {
    const { userId, paymentMethodId, amount, description, cardId, serviceId } = req.body;

    // Validación básica de los parámetros
    if (!userId || !paymentMethodId || !amount || !description) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    if (amount <= 0) {
      return res.status(400).json({ error: 'El monto debe ser mayor que cero' });
    }

    try {
      const result = await PaymentModel.makePayment(userId, paymentMethodId, amount, description, cardId || null, serviceId || null);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
};

module.exports = paymentController;
