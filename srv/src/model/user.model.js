// models/user.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id_usuario: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'id_usuario', // Nome da coluna no banco de dados
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'name', // Nome da coluna no banco de dados
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
<<<<<<< HEAD
    validate: {
      isEmail: true,
    },
=======
    field: 'email', // Nome da coluna no banco de dados
>>>>>>> main
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'password', // Nome da coluna no banco de dados
  },
}, {
<<<<<<< HEAD
  tableName: 'Usuario',
  timestamps: false,
=======
  tableName: 'usuario', // Nome da tabela no banco de dados
  timestamps: false, // Desabilita createdAt e updatedAt
>>>>>>> main
});

module.exports = User;
