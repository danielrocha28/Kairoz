import sequelize from '../config/database.js';
import { DataTypes, Sequelize } from 'sequelize';
import User from './user.model.js';

const Asnwer = sequelize.define('Asnwer', {
    id_answer:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true,
        autoIncrement: true,
        field: 'id_answer',
    },
    /*id_question:{
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'id_question',
        references:{
            model: Question,
            key: 'id_question',
        }
    },*/
    id_user:{
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'id_user',
        references:{
            model: User,
            key: 'id_user',
        }
    },
    text:{
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'text',
    },
    created_at:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'created_at',
    },
},{
    tableName: 'answer',
    timestamps: false,
});

export default Asnwer;