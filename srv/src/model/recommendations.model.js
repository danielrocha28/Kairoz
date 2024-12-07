import sequelize from '../config/database.js';
import { DataTypes, Sequelize } from 'sequelize';
import User from './user.model.js';

const Recommendation = sequelize.define('recommendations', {
    id_recommendation:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'id_recommendation'
    },
    id_user:{
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'id_user',
        references:{
            model: User,
            key: 'id_user'
        },
    },
    type:{ // recommendation type
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'type',
    },
    created_at:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'created_at',
    },
    link:{
        type: DataTypes.TEXT,
        field: 'link',
    }
}, {
    tableName: 'recommendation',
    timestamps: false,
});

export default Recommendation; 
