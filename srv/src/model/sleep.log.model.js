import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';
import User from '../model/user.model.js';

const SleepTime = sequelize.define('SleepTime', {
    id_sleep:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
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

    id_user:{
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'id_user',
        references:{
            model: User,
            key: 'id_user',
        },
    },
},{
    tableName: 'sleep_time',
    timestamps: false,
});

export default SleepTime;