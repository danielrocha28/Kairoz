import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';


export const cards = sequelize.define('cards', {
    id_cards: {
        type: DataTypes.INTEGER,
        autoIncrement: true, // Defina como true se você quer que o ID seja gerado automaticamente
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
    }
}, {
    tableName: 'cards', 
    timestamps: true, // Cria os campos createdAt e updatedAt
});

export const decks = sequelize.define('decks',{
    id_decks: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'id_decks'

    },

    name: {
        type:DataTypes.STRING,
        allowNull: false

    },
    description:{
        type: DataTypes.STRING,
        allowNull: false,
    },
})

decks.hasMany(cards, { foreignKey: 'id_decks', sourceKey: 'id_decks' });
cards.belongsTo(decks, { foreignKey: 'Id_decks', targetKey: 'id_decks' });



// Exporta o modelo
export default {cards, decks};
