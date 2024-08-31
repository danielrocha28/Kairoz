const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


 function newTask(){ sequelize.Define('Tasks', {
  id_task: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },

  task_type: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },

  estimated_time: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  priority:{
    type: DataTypes.STRING(50),
    allowNull: false,
  },

  status:{
    type: DataTypes.STRING(50),
    allowNull: false,
    validate:{
        isIn:{
          args: [['A fazer', 'Em progresso', 'Concluida']],
           msg: 'O status deve ser: (A fazer, Em progresso ou Concluida)',
        }
    }
  },
  tableName: "Tarefa",
  timestamps: true,
  
});

}
module.exports = newTask;