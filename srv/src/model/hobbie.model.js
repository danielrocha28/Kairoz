import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';
import User from './user.model.js';

const Hobbie = sequelize.define('Hobbie', {
    id_hobbie:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true, 
        field: 'id_hobbie',
    },

    importance:{
        type: DataTypes.ENUM('essential', 'for leisure'),
        allowNull: false,
        field: 'importance',
    },

    remember:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'remember,'
    },

    repeat:

    description:{
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'description',
    },

    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'id_user',
        references:{
            model: User,
            key: 'id_user',
        }
    },

},{
    tableName: 'hobbie',
    timestamps: false,
});

export default Hobbie;