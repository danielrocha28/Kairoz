import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Task = sequelize.define('Task', {
    id_task: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'id_task',
    },
    id_sprint: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Sprint', // Nome da tabela Sprint
            key: 'id_sprint',
        },
        field: 'id_sprint', // Como está no BD
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'title',
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'type',
    },
    estimated_time: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'estimated_time',
    },
    date: {
        type: DataTypes.DATEONLY, // Apenas data
        allowNull: false,
        field: 'date',
    },
    priority: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'priority',
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['To_Do', 'In_Progress', 'Completed']], // Restringir aos valores válidos
        },
        field: 'status',
    },
}, {
    tableName: 'task',
    timestamps: false,
});

export default Task;