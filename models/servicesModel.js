// models/servicesModel.js

const pool = require('../config/db');

// Función para obtener todos los servicios
const getAllServices = async () => {
  const [rows] = await pool.query('SELECT * FROM Services');
  return rows;
};

// Función para obtener un servicio por su ID
const getServiceById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM Services WHERE id = ?', [id]);
  return rows[0];
};

// Función para crear un nuevo servicio
const createService = async (name, description, price, type) => {
  const [result] = await pool.query(
    'INSERT INTO Services (name, description, price, type) VALUES (?, ?, ?, ?)',
    [name, description, price, type]
  );
  return result.insertId;  // Devuelve el ID del nuevo servicio
};

// Función para actualizar un servicio
const updateService = async (id, name, description, price, type) => {
  await pool.query(
    'UPDATE Services SET name = ?, description = ?, price = ?, type = ? WHERE id = ?',
    [name, description, price, type, id]
  );
};

// Función para eliminar un servicio
const deleteService = async (id) => {
  await pool.query('DELETE FROM services WHERE id = ?', [id]);
};

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
