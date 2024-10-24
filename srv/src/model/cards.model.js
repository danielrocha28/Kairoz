import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Decks from './decks.model.js';

const Cards = sequelize.define('cards', {
    id_cards: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'id_cards',
    },
    front: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    verse: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_decks: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Decks, // References the Decks model
            key: 'id_decks' // Primary key in Decks

        }}
}, {
    tableName: 'cards', 
    timestamps: true, 
    createdAt: 'created_at', 
    updatedAt: 'updated_at'
});

Decks.hasMany(Cards, { foreignKey: 'id_decks', sourceKey: 'id_decks', as: 'cards' });
Cards.belongsTo(Decks, { foreignKey: 'id_decks', targetKey: 'id_decks' });

export default Cards;
