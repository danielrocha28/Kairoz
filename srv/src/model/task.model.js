import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; 

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  parentId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Task',
      key: 'id'
    }
  },
  repeat: {
    type: DataTypes.ENUM('daily', 'weekly', 'monthly', 'yearly', 'none'),
    defaultValue: 'none'
  },
  category: {
    type: DataTypes.ENUM('study', 'work', 'health', 'leisure'),
    allowNull: false
  },
  priority: {
    type: DataTypes.ENUM('low', 'medium', 'high'),
    defaultValue: 'medium'
  },
  status: {
    type: DataTypes.ENUM('pending', 'in-progress', 'completed'),
    defaultValue: 'pending'
  },
  dueDate: {
    type: DataTypes.DATE
  },
  reminder: {
    type: DataTypes.DATE
  },
  notes: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'tasks',
  timestamps: true
});

// Define o autorelacionamento
Task.hasMany(Task, { as: 'Subtasks', foreignKey: 'parentId' });
Task.belongsTo(Task, { as: 'ParentTask', foreignKey: 'parentId' });

export default Task;
