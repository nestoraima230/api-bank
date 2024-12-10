const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/servicesController');

// Ruta para obtener todos los servicios
router.get('/', serviceController.getAllServices);

// Ruta para obtener un servicio específico por ID
router.get('/:id', serviceController.getServiceById);

module.exports = router;
