// routes/servicesRoutes.js

const express = require('express');
const router = express.Router();
const servicesController = require('../controllers/servicesController');

// Obtener todos los servicios
router.get('/', servicesController.getAllServices);

// Obtener un servicio por ID
router.get('/:id', servicesController.getServiceById);

// Crear un nuevo servicio
router.post('/', servicesController.createService);

// Actualizar un servicio
router.put('/:id', servicesController.updateService);

// Eliminar un servicio
router.delete('/:id', servicesController.deleteService);

module.exports = router;
