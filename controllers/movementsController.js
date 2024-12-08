const movementModel = require('../models/movementsModel');

const getMovements = async (req, res) => {
  const userId = req.user.id;
  console.log('Obteniendo movimientos para userId:', userId);

  try {
    const movements = await movementModel.getMovements(userId);
    console.log('Movimientos obtenidos:', movements);
    res.json(movements);
  } catch (error) {
    console.error('Error al obtener los movimientos:', error.message);
    res.status(500).json({ message: 'Error al obtener los movimientos' });
  }
};

const getFilteredMovements = async (req, res) => {
  const { date, type } = req.query;
  const userId = req.user.id;

  console.log('Parámetros recibidos:', { userId, date, type });

  try {
    const movements = await movementModel.getFilteredMovements(userId, date, type);
    console.log('Movimientos filtrados obtenidos:', movements);
    res.json(movements);
  } catch (error) {
    console.error('Error al obtener los movimientos filtrados:', error.message);
    res.status(500).json({ message: 'Error al obtener los movimientos filtrados' });
  }
};

module.exports = {
  getMovements,
  getFilteredMovements
};
