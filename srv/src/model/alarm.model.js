import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';
import User from './user.model.js';

const Alarm = sequelize.define('Alarm', {
    id_alarm: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_alarm',
    },
    alarm_time: {
        type: DataTypes.TIME,
        allowNull: false,
        field: 'alarm_time',
    },
    alarm_day:{
        type: DataTypes.ARRAY(DataTypes.ENUM('dom','seg','ter','qua','qui','sex','sab')),
        defaultValue: ['none'],
        field: 'alarm_day',
    },
    message: {
        type: DataTypes.STRING(200),
        defaultValue: null,
        field: 'message',
    },
    executed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'executed'
    },
    id_user:{
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'id_user',
        references: {
            model: User,
            key: 'id_user',
        },
    }
    },{
    tableName: 'alarm',
    timestamps: false,
});

export default Alarm;