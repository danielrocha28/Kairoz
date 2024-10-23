import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './user.model.js';

const Album_photos = sequelize.define('Album_photos',{
    id_album:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_album',
    },
    name_album:{
        type: DataTypes.STRING(50),
        field: 'name_album',
    },
    legend_album:{
        type: DataTypes.STRING(100),
        field: 'legend_album',
    },
    id_user:{
        type: DataTypes.INTEGER,
        field: 'id_user',
        references:{
            model: User,
            key: 'id_user',
        }
    }
},{
    tableName: 'album_photos',
    timestamps: false,
});

export default Album_photos;