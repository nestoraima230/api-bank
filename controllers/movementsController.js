const movementModel = require('../models/movementsModel');

const getMovements = async (req, res) => {
  const userId = req.user.id;  

  try {
    const movements = await movementModel.getMovements(userId);
    res.json(movements);  
  } catch (error) {
    console.error("Error al obtener los movimientos:", error.message);  
    res.status(500).json({ message: 'Error al obtener los movimientos' }); 
  }
};

const getFilteredMovements = async (req, res) => {
  const { date, type } = req.query;  
  const userId = req.user.id;  

  console.log("Parametros recibidos:", { date, type });  

  try {
    const movements = await movementModel.getFilteredMovements(userId, date, type);
    res.json(movements);  
  } catch (error) {
    console.error("Error en el backend:", error.message);  
    res.status(500).json({ message: 'Error al obtener los movimientos filtrados' });  
  }
};

module.exports = {
  getMovements,
  getFilteredMovements
};
