import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import decks from './decks.model.js'

export const cards = sequelize.define('cards', {
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
            model: decks, // References the Decks model
            key: 'id_decks' // Primary key in Decks
        }}
}, {
    tableName: 'cards', 
    timestamps: true, 
    createdAt: 'created_at', 
    updatedAt: 'updated_at'
});

decks.hasMany(cards, { foreignKey: 'id_decks', sourceKey: 'id_decks', as: 'cards' });
cards.belongsTo(decks, { foreignKey: 'id_decks', targetKey: 'id_decks' });

export default cards;
