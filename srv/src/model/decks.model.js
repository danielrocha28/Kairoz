import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';


const Decks = sequelize.define('decks',{
    id_decks: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'id_decks'

    },

    name: {
        type:DataTypes.STRING,
        allowNull: true,

    },
    description:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    id_cards: { 
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'cards',
            key: 'id_cards' 
        }}

},
{
    tableName: 'decks',
    timestamps: true, 
    createdAt: 'created_at', 
    updatedAt: 'updated_at'
});

export default Decks;