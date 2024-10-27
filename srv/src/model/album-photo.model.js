import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './user.model.js';

const Album = sequelize.define('Album',{
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
    tableName: 'album',
    timestamps: false,
});

const Photo = sequelize.define('Photo', {
    id_photo:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_photo',
    },

    name_file:{
        type: DataTypes.STRING,
        field: 'name_file',
    },
    URL:{
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'URL',
    },
    id_album:{
        type: DataTypes.INTEGER,
        field:'id_album',
        references:{
            model: Album,
            key: 'id_album',
        },
    },
},{
   tableName: 'photo',
   timestamps: false, 
});

// defining relationships
User.hasMany(Album, { foreignKey: 'id_user' });
Album.belongsTo(User, { foreignKey: 'id_user' });

Album.hasMany(Photo, { foreignKey: 'id_album' });
Photo.belongsTo(Album, { foreignKey: 'id_album' });

export { Album, Photo };