// models/user.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
  id_usuario: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'id_usuario', // Nome da coluna no banco de dados
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'nome', // Nome da coluna no banco de dados
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    field: 'email', // Nome da coluna no banco de dados
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'senha', // Nome da coluna no banco de dados
  },
}, {
  tableName: 'usuario', // Nome da tabela no banco de dados
  timestamps: false, // Desabilita createdAt e updatedAt
});


export default User;