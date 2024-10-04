import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';


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
    id_cards: { // A coluna que relaciona ao deck
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            key: 'id_cards' 
        }}

},
{
    tableName: 'decks',
    timestamps: true, // Isso cria as colunas createdAt e updatedAt
    createdAt: 'created_at', // Se você quiser usar snake_case
    updatedAt: 'updated_at'
})



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
    },
    id_decks: { // A coluna que relaciona ao deck
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: decks, // Referencia o modelo Decks
            key: 'id_decks' // Chave primária em Decks
        }}
}, {
    tableName: 'cards', 
    timestamps: true, // Isso cria as colunas createdAt e updatedAt
    createdAt: 'created_at', // Se você quiser usar snake_case
    updatedAt: 'updated_at'
});



decks.hasMany(cards, { foreignKey: 'id_decks', sourceKey: 'id_decks' });
cards.belongsTo(decks, { foreignKey: 'id_decks', targetKey: 'id_decks' });



// Exporta o modelo
export default decks;
