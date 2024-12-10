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
      // Llamar a la función makePayment del modelo
      const result = await PaymentModel.makePayment(userId, paymentMethodId, amount, description, cardId || null, serviceId || null);
      // Responder con el mensaje de éxito
      return res.status(200).json(result);
    } catch (error) {
      // Manejo de errores con un mensaje claro
      console.error('Error en el controlador de pagos:', error);
      return res.status(500).json({ error: error.message || 'Error interno al procesar el pago' });
    }
  },
};

module.exports = paymentController;