const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Timers = require("./timer.model");
const Tasks = require("./task.model");

function Graphics() {
  sequelize.define,
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
          key: "ID_time",
        },
        field: "ID_tempo",
      },

      id_task: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: tasks,
          key: "id_task",
        },
        field: "ID_tarefa",
      },
    };

  Graphics.hasMany("Timers", { foreignKey: "id_time" });
  Timers.belongsTo("Graphics", { foreignKey: "id_time" });

  Graphics.hasMany("Tasks", { foreignKey: "id_task" });
  Tasks.belongsTo("Graphics", { foreignKey: "id_task" });
}

module.exports = Graphics;
