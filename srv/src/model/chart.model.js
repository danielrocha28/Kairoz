import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Timers from "./timer.model.js";
import Tasks from "./task.model.js";

const Chart = sequelize.define(
  "Chart",
  {
    id_graphic: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: "id_chart",
    },
    id_time: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Timers,
        key: "id_time",
      },
      field: "id_time",
    },
    id_task: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Tasks,
        key: "id_task",
      },
      field: "id_task",
    },
  },
  {
    tableName: "chart", // Nome da tabela no banco de dados
    timestamps: false, // Se não estiver usando createdAt/updatedAt
    freezeTableName: true, // Para evitar pluralização automática
  }
);

// Definindo as associações
Chart.hasMany(Timers, { foreignKey: "id_time" });
Timers.belongsTo(Chart, { foreignKey: "id_time" });

Chart.hasMany(Tasks, { foreignKey: "id_task" });
Tasks.belongsTo(Chart, { foreignKey: "id_task" });

export default Chart;
