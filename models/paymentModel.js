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

    // Validación de los parámetros adicionales (cardId y serviceId)
    if (cardId && typeof cardId !== 'number') {
      throw new Error('El cardId debe ser un número válido');
    }

    if (serviceId && typeof serviceId !== 'number') {
      throw new Error('El serviceId debe ser un número válido');
    }

    try {
      // Llamada al procedimiento almacenado para realizar el pago
      const [rows] = await db.execute('CALL MAKE_PAYMENT(?, ?, ?, ?, ?, ?, @message)', [
        userId,           // ID del usuario
        paymentMethodId,  // ID del método de pago (saldo o tarjeta)
        amount,           // Monto del pago
        description,      // Descripción del pago
        cardId,           // ID de la tarjeta (opcional)
        serviceId,        // ID del servicio (opcional)
      ]);

      // Obtener el mensaje de respuesta del procedimiento
      const [[{ message }]] = await db.execute('SELECT @message AS message');

      // Verificación del mensaje de éxito
      if (!message || message !== 'Pago procesado exitosamente') {
        throw new Error(message || 'Error desconocido al procesar el pago');
      }

      // Si todo fue exitoso, retornamos el mensaje de éxito
      return { message };

    } catch (error) {
      // Log de error con más detalles
      console.error(`Error al procesar el pago. Datos enviados: userId: ${userId}, paymentMethodId: ${paymentMethodId}, amount: ${amount}, description: ${description}, cardId: ${cardId}, serviceId: ${serviceId}`);
      console.error('Error:', error);
      throw new Error(error.message || 'Error al procesar el pago');
    }
  },
};

module.exports = PaymentModel;
