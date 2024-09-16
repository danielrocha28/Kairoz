import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Tasks from "./task.model.js";

const Timers = sequelize.define(
  "Timers",
  {
    id_time: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: "id_tempo",
    },

    start_time: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "data_inicio",
    },

    status_time: {
      type: DataTypes.STRING,
      validate: {
        isIn: [["Pausado", "Retomado"]],
      },
      field: "estado",
    },

    end_time: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "data_fim",
    },

    total_time: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "tempo_total",
      defaultValue: 0,
    },

    id_task: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Tasks,
        key: "id_task",
      },
      field: "id_tarefa",
    },
  },
  {
    sequelize,
    tableName: "tempo_estudo",
    timestamps: false,
    freezeTableName: true,
    hooks: {
      beforeUpdate: (Timers, options) => {
        if (Timers.start_time && Timers.end_time) {
          Timers.status_time = "Pausado";
          const total = Timers.end_time - Timers.start_time;
          Timers.total_time = Math.floor(total / 1000);
        }
      },
    },
  }
);

// Configurar associações
Tasks.hasMany(Timers, { foreignKey: "id_task" });
Timers.belongsTo(Tasks, { foreignKey: "id_task" });

export default Timers;
