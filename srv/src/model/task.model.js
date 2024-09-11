const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const Task = sequelize.define(
  "Tasks",
  {
    id_task: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: "ID_tarefa",
    },

    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "Titulo",
    },

    task_type: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "Tipo",
    },

    estimated_time: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "Tempo_estimado",
    },

    priority: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: "Prioridade",
    },

    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        isIn: {
          args: [["A fazer", "Em progresso", "Concluida"]],
          msg: "O status deve ser: (A fazer, Em progresso ou Concluida)",
        },
      },
      field: "Estado",
    },
  },
  {
    tableName: "tarefa",
    timestamps: false,
    freezeTableName: true,
  }
);



module.exports = Task;