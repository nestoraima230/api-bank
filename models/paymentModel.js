const db = require('../config/db');

const PaymentModel = {
  makePayment: async (userId, paymentMethodId, amount, description, cardId = null) => {
    try {
      const [rows] = await db.execute('CALL MAKE_PAYMENT(?, ?, ?, ?, ?, @message)', [
        userId,
        paymentMethodId,
        amount,
        description,
        cardId,
      ]);

      const [[{ message }]] = await db.execute('SELECT @message AS message');

      if (!message || message !== 'Pago procesado exitosamente') {
        throw new Error(message || 'Error desconocido al procesar el pago');
      }

      return { message };
    } catch (error) {
      throw new Error(error.message || 'Error al procesar el pago');
    }
  },
};

module.exports = PaymentModel;
