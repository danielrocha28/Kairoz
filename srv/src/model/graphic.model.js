import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Timers from "./timer.model.js";
import Tasks from "./task.model.js";

const Graphics = sequelize.define(
  "Graphics",
  {
    id_graphic: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: "ID_grafico",
    },
    id_time: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Timers,
        key: "id_time",
      },
      field: "ID_tempo",
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
    tableName: "grafico", // Nome da tabela no banco de dados
    timestamps: false, // Se não estiver usando createdAt/updatedAt
    freezeTableName: true, // Para evitar pluralização automática
  }
);

// Definindo as associações
Graphics.hasMany(Timers, { foreignKey: "id_time" });
Timers.belongsTo(Graphics, { foreignKey: "id_time" });

Graphics.hasMany(Tasks, { foreignKey: "id_task" });
Tasks.belongsTo(Graphics, { foreignKey: "id_task" });

export default Graphics;
