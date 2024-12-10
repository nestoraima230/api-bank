const db = require('../config/db');

const PaymentModel = {
  makePayment: async (userId, paymentMethodId, amount, description, cardId = null, serviceId = null) => {
    // Validación de los parámetros
    if (!userId || !paymentMethodId || !amount || !description) {
      throw new Error('Faltan datos obligatorios');
    }
    if (amount <= 0) {
      throw new Error('El monto debe ser mayor que cero');
    }

    // Validar cardId y serviceId como números
    if (cardId && isNaN(cardId)) {
      throw new Error('El cardId debe ser un número válido');
    }
    if (serviceId && isNaN(serviceId)) {
      throw new Error('El serviceId debe ser un número válido');
    }

    try {
      // Llamada al procedimiento almacenado
      const [rows] = await db.execute('CALL MAKE_PAYMENT(?, ?, ?, ?, ?, ?, @message)', [
        userId,
        paymentMethodId,
        amount,
        description,
        cardId,
        serviceId,
      ]);

      // Obtener el mensaje de respuesta del procedimiento
      const [[{ message }]] = await db.execute('SELECT @message AS message');

      // Verificación del mensaje de éxito
      if (!message || message !== 'Pago procesado exitosamente') {
        throw new Error(message || 'Error desconocido al procesar el pago');
      }

      return { message };
    } catch (error) {
      console.error('Error al realizar el pago:', error); // Puedes usar esto para depurar
      throw new Error(error.message || 'Error al procesar el pago');
    }
  },
};

module.exports = PaymentModel;
