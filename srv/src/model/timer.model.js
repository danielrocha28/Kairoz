const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Tasks = require("./task.model");

const Timers = sequelize.define(
  "Timers",
  {
    id_time: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: "ID_tempo",
    },

    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "Data_inicio",
    },

    end_time: {
      type: DataTypes.DATE,
      allowNull: true, 
      field: "Data_fim",
    },

    total_time: {
      type: DataTypes.INTEGER, 
      allowNull: false,
      field: "Tempo_total",
      defaultValue: 0, 
    },

    id_task: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Tasks, 
        key: "id_task", 
      },
      field: "ID_tarefa",
    },
  },
  {
    sequelize,
    tableName: "tempo_estudo",
    timestamps: false,
    freezeTableName: true,
    hooks: {
      //função para automatizar o salvamento do total
      beforeUpdate: ((Timers, options) => {
        if (t.start_Timers && Timers.end_time) {
          const total = Timers.end_time - Timers.start_time;
          Timers.total_time = Math.floor(total / 1000);
          }
        }),
    },
  }
);

// Configurar associações
Tasks.hasMany(Timers, { foreignKey: 'id_task' }),
Timers.belongsTo(Tasks, { foreignKey: 'id_task' }),

module.exports = Timers;
