import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Timers from './timer.model.js';
import Tasks from './task.model.js';

const Chart = sequelize.define('chart',
  {
    id_chart: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'id_chart',
    },
    id_time: {
      type: DataTypes.INTEGER,
      references: {
        model: Timers,
        key: 'id_time',
      },
      field: 'id_time',
    },
    id_task: {
      type: DataTypes.INTEGER,
      references: {
        model: Tasks,
        key: 'id_task',
      },
      field: 'id_task',
    },
    type:{
        type: DataTypes.STRING(50),
        allowNull: false, 
    },
  },
  {
    tableName: 'chart', // Define table name explicitly
    timestamps: false, // Assuming you don't want Sequelize to manage `createdAt` and `updatedAt`
  }
);

// Associations
Chart.hasMany(Timers, { foreignKey: 'id_time' });
Timers.belongsTo(Chart, { foreignKey: 'id_time' });

Chart.hasMany(Tasks, { foreignKey: 'id_task' });
Tasks.belongsTo(Chart, { foreignKey: 'id_task' });

export default Chart;