import {DataTypes} from 'sequelize';
import sequelize from '../config/database';

const note = sequelize.define('note', {
    id_note: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'id_user',
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false,
        field: 'title',
    },
    content:{
        type: DataTypes.STRING,
        allowNull: true,
        field: 'description',
    }}, {
        tableName: 'note',
        timestamps: true, 
        createdAt: 'created_at', 
        updatedAt: 'updated_at'
    });

export default note;
  
