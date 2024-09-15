// models/user.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

 const User = sequelize.define('User', {
  id_usuario: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'ID_usuario', // Nome da coluna no banco de dados
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'Nome_usuario', // Nome da coluna no banco de dados
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    field: 'Email_usuario', // Nome da coluna no banco de dados
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'Senha_usuario', // Nome da coluna no banco de dados
  },
}, {
  tableName: 'usuario', // Nome da tabela no banco de dados
  timestamps: false, // Desabilita createdAt e updatedAt
});


module.exports = User;
