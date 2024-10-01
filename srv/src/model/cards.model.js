import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Flashcard = sequelize.define('Flashcard', {
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
    tableName: 'Flashcard', // Nome da tabela (singular)
    timestamps: true, // Cria os campos createdAt e updatedAt
});

// Exporta o modelo
export default Flashcard;
