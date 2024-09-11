// models/user.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const Tarefa = sequelize.define('Tarefa', {
    id_tarefa: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'id_tarefa', 
    },
    id_sprint: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Sprint', // Nome da tabela Sprint
            key: 'id_sprint',
        },
        field: 'id_sprint', //como ta no bd 
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'titulo', 
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'tipo', 
    },
    tempo_estimado: {
        type: DataTypes.STRING, 
        allowNull: true,
        field: 'tempo_estimado', 
    },
    data: {
        type: DataTypes.DATEONLY, //apenas data 
        allowNull: false,
        field: 'data', 
    },
    prioridade: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'prioridade', 
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['A_Fazer', 'Em_Progresso', 'Concluida']], // Restringir aos valores válidos
        },
        field: 'estado', 
    },
}, {
    tableName: 'tarefa', 
    timestamps: false, 
});

module.exports = Tarefa;