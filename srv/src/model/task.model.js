const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const Task = sequelize.define(
  "Tasks",
  {
    id_task: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: "id_tarefa",
    },

    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "titulo",
    },

    task_type: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "tipo",
    },

    estimated_time: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "tempo_estimado",
    },

    priority: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: "prioridade",
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
      field: "estado",
    },
  },
  {
    tableName: "tarefa",
    timestamps: false,
    freezeTableName: true,
  }
);



module.exports = Task;