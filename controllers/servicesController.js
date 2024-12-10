// controllers/servicesController.js

const servicesModel = require('../models/servicesModel');

// Obtener todos los servicios
const getAllServices = async (req, res) => {
  try {
    const services = await servicesModel.getAllServices();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los servicios', error });
  }
};

// Obtener un servicio por ID
const getServiceById = async (req, res) => {
  const { id } = req.params;
  try {
    const service = await servicesModel.getServiceById(id);
    if (service) {
      res.status(200).json(service);
    } else {
      res.status(404).json({ message: 'Servicio no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el servicio', error });
  }
};

// Crear un nuevo servicio
const createService = async (req, res) => {
  const { name, description, price, type } = req.body;
  try {
    const newServiceId = await servicesModel.createService(name, description, price, type);
    res.status(201).json({ message: 'Servicio creado con éxito', id: newServiceId });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el servicio', error });
  }
};

// Actualizar un servicio
const updateService = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, type } = req.body;
  try {
    await servicesModel.updateService(id, name, description, price, type);
    res.status(200).json({ message: 'Servicio actualizado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el servicio', error });
  }
};

// Eliminar un servicio
const deleteService = async (req, res) => {
  const { id } = req.params;
  try {
    await servicesModel.deleteService(id);
    res.status(200).json({ message: 'Servicio eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el servicio', error });
  }
};

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};