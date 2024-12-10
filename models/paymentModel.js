const pool = require('../config/db');  // Conexión a la base de datos

const PaymentModel = {
  makePayment: async (userId, paymentMethodId, amount, description, cardId = null, serviceId = null) => {
    if (!userId || !paymentMethodId || !amount || !description) {
      throw new Error('Faltan datos obligatorios');
    }
    if (amount <= 0) {
      throw new Error('El monto debe ser mayor que cero');
    }

    try {
      // Llamada al procedimiento almacenado para procesar el pago
      const [rows] = await pool.execute('CALL MAKE_PAYMENT(?, ?, ?, ?, ?, ?, @message)', [
        userId,
        paymentMethodId,
        amount,
        description,
        cardId,
        serviceId,
      ]);

      const [[{ message }]] = await pool.execute('SELECT @message AS message');

      if (!message || message !== 'Pago procesado exitosamente') {
        throw new Error(message || 'Error desconocido al procesar el pago');
      }

      return { message };
    } catch (error) {
      console.error(error);  // Puede ser útil para debuggear
      throw new Error(error.message || 'Error al procesar el pago');
    }
  },
};

module.exports = PaymentModel;
