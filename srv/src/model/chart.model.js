import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
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

Chart.hasMany(Tasks, { foreignKey: 'id_task' });
Tasks.belongsTo(Chart, { foreignKey: 'id_task' });

export default Chart;