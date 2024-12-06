import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

const SleepTime = sequelize.define('SleepTime', {
    id_sleep:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: 'id_sleep',
    },

    sleep_time:{
        type: DataTypes.STRING,
        allowNull: false,
        field: 'sleep_time',
    },

    wake_up_time:{
        type: DataTypes.STRING,
        allowNull: false,
        field: 'wake_up_time',
    },
},{
    tableName: 'sleep_time',
    timestamps: false,
});

export default SleepTime;