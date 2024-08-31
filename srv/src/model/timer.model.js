const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Tasks = require("./task.model");

function Timers(){ sequelize.define(
  'Timers',
  {
    id_time: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    total_time: {
      type: DataTypes.INTEGER, // Use INTEGER para armazenar o tempo total em segundos ou milissegundos
      allowNull: false,
    },
    id_task: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Tasks,
        key: 'id_task',
      },
    },
  },
  {
    tableName: "Tempo_Estudo",
    timestamps: true,
  }
);


Tasks.hasMany(Timers, { foreignKey: "id_task" });
Timers.belongsTo(Tasks, { foreignKey: "id_task" });
}

module.exports = Timers;


