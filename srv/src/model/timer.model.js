import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Tasks from './task.model.js';

const Timers = sequelize.define(
  'Timers',
  {
    id_time: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'id_time',
    },

    start_time: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'start_time',
    },

    status_time: {
      type: DataTypes.STRING,
      validate: {
        isIn: [['Paused', 'Resumed']],
      },
      field: 'status_time',
    },

    end_time: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'end_time',
    },

    total_time: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'total_time',
      defaultValue: 0,
    },
    day_update:{
      type: DataTypes.ENUM('none','0','1','2','3','4','5','6'),
      allowNull: false,
      defaultValue: 'none',
    },
    id_task: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Tasks,
        key: 'id_task',
      },
      field: 'id_task',
    },
  },
  {
    tableName: 'study_time',
    timestamps: false,
    freezeTableName: true,
  }
);

// Set up associations
Tasks.hasMany(Timers, { foreignKey: 'id_task' });
Timers.belongsTo(Tasks, { foreignKey: 'id_task' });

export default Timers;
