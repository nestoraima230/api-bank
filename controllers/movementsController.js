const movementModel = require('../models/movementModel');

const getMovements = async (req, res) => {
  const userId = req.user.id; 

  try {
    const movements = await movementModel.getMovements(userId);
    res.json(movements);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los movimientos' });
  }
};

const getFilteredMovements = async (req, res) => {
  const userId = req.user.id;
  const { date, type } = req.query; 

  try {
    const movements = await movementModel.getFilteredMovements(userId, date, type);
    res.json(movements);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los movimientos filtrados' });
  }
};

module.exports = {
  getMovements,
  getFilteredMovements
};
