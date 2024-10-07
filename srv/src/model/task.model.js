import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'id_task'
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  parentid: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'tasks',
      key: 'id_task'
    }
  },
  repeat: {
    type: DataTypes.ENUM('daily', 'weekly', 'monthly', 'yearly', 'none'),
    allowNull: true,
    defaultValue: 'none'
  },
  category: {
    type: DataTypes.ENUM('study', 'work', 'health', 'leisure'),
    allowNull: false
  },
  priority: {
    type: DataTypes.ENUM('low', 'medium', 'high'),
    allowNull: true,
    defaultValue: 'medium'
  },
  status: {
    type: DataTypes.ENUM('pending', 'in-progress', 'completed'),
    allowNull: true,
    defaultValue: 'pending'
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'duedate'
  },
  reminder: {
    type: DataTypes.DATE,
    allowNull: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  // Adicionando o campo order para gerenciar a ordenação das tarefas
  order: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  tableName: 'tasks',
  timestamps: true,
  underscored: true
});

// Relacionamento parent-child (uma tarefa pode ser filha de outra)
Task.belongsTo(Task, { as: 'parent', foreignKey: 'parentid' });

export default Task;