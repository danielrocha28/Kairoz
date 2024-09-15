<<<<<<< HEAD
// models/user.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id_usuario: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'id_usuario', // Nome da coluna no banco de dados
=======
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
  id_user: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'id_user',
>>>>>>> 4a152a40d614e80974ab4c402cffcf18b9f86314
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
<<<<<<< HEAD
    field: 'name', // Nome da coluna no banco de dados
=======
    field: 'name',
>>>>>>> 4a152a40d614e80974ab4c402cffcf18b9f86314
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
<<<<<<< HEAD
    field: 'email', // Nome da coluna no banco de dados
=======
    field: 'email',
>>>>>>> 4a152a40d614e80974ab4c402cffcf18b9f86314
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
<<<<<<< HEAD
    field: 'password', // Nome da coluna no banco de dados
  },
}, {
  tableName: 'usuario', // Nome da tabela no banco de dados
  timestamps: false, // Desabilita createdAt e updatedAt
});

module.exports = User;
=======
    field: 'password',
  },
}, {
  tableName: 'user',
  timestamps: false,
  dialectOptions: {
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  },
});

export default User;
>>>>>>> 4a152a40d614e80974ab4c402cffcf18b9f86314
