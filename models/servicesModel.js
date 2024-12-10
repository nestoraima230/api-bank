const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');  // Asegúrate de tener configurada la conexión de Sequelize

const Service = sequelize.define('Service', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'services',  // Define el nombre de la tabla
  timestamps: false  // Si no necesitas timestamps
});

module.exports = Service;
