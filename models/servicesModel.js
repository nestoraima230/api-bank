// models/servicesModel.js

const pool = require('../config/db');

// Función para obtener todos los servicios
const getAllServices = async () => {
  // Consultamos solo service_id, service_name y description de los servicios activos
  const [rows] = await pool.query('SELECT service_id, service_name, description FROM Services WHERE is_active = TRUE');
  return rows;
};

// Función para obtener un servicio por su ID
const getServiceById = async (id) => {
  // Buscamos un solo servicio por su ID
  const [rows] = await pool.query('SELECT service_id, service_name, description FROM Services WHERE service_id = ? AND is_active = TRUE', [id]);
  return rows[0];  // Si existe, devuelve el servicio, de lo contrario, undefined
};

// Función para crear un nuevo servicio
const createService = async (service_name, description) => {
  // Insertamos el nuevo servicio
  const [result] = await pool.query(
    'INSERT INTO Services (service_name, description) VALUES (?, ?)',
    [service_name, description]
  );
  return result.insertId;  // Retornamos el ID del servicio recién insertado
};

// Función para actualizar un servicio
const updateService = async (service_id, service_name, description) => {
  // Actualizamos un servicio por su ID
  await pool.query(
    'UPDATE Services SET service_name = ?, description = ? WHERE service_id = ?',
    [service_name, description, service_id]
  );
};

// Función para eliminar un servicio
const deleteService = async (service_id) => {
  // Eliminamos el servicio (en realidad se desactiva con is_active = FALSE)
  await pool.query('UPDATE Services SET is_active = FALSE WHERE service_id = ?', [service_id]);
};

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
