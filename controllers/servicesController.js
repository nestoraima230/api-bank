const Service = require('../models/servicesModel');

// Función para obtener todos los servicios
const getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll();  // Obtiene todos los servicios de la base de datos
    res.json(services);  // Responde con los servicios
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los servicios' });
  }
};

// Función para obtener un servicio específico por ID
const getServiceById = async (req, res) => {
  const { id } = req.params;
  try {
    const service = await Service.findByPk(id);  // Busca el servicio por su ID
    if (!service) {
      return res.status(404).json({ message: 'Servicio no encontrado' });
    }
    res.json(service);  // Responde con el servicio
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el servicio' });
  }
};

module.exports = { getAllServices, getServiceById };
