import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './user.model.js';

const Task = sequelize.define(
  'Task',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'id_task',
    },
    tag: {
      type: DataTypes.ENUM('task', 'study topic'),
      allowNull: false,
      defaultValue: 'task',
      field: 'tag',
    },
    day_update:{
      type: DataTypes.ENUM('dom','seg','ter','qua','qui','sex','sab'),
      allowNull: true,
      defaultValue: 'none',
      field: 'day_update',
    },
    total_time: {
      type: DataTypes.TIME,
      allowNull: true,
      field: 'total_time',
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    parentid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tasks',
        key: 'id_task',
      },
    },
    repeat: {
      type: DataTypes.ENUM('daily', 'weekly', 'monthly', 'yearly', 'none'),
      allowNull: true,
      defaultValue: 'none',
    },
    category: {
      type: DataTypes.ENUM('study', 'work', 'health', 'leisure'),
      allowNull: false,
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high'),
      allowNull: true,
      defaultValue: 'medium',
    },
    status: {
      type: DataTypes.ENUM('pending', 'in-progress', 'completed'),
      allowNull: true,
      defaultValue: 'pending',
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'duedate',
    },
    reminder: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id_user',
      },
      field: 'id_user',
    },
  },
  {
    tableName: 'tasks',
    timestamps: true,
    underscored: true,
  }
);

Task.belongsTo(User, { foreignKey: 'id_user', as: 'user' });
Task.belongsTo(Task, { as: 'parent', foreignKey: 'parentid' });

export default Task;