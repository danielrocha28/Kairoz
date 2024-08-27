const Sequelize = require('sequelize');
const sequelize = require('./bd');

const Nota = sequelize.define('Nota',{
    titulo: {
        type: Sequelize.STRING,
        allowNull: true
    },
    conteudo: {
        type: Sequelize.STRING
    }
})

Nota.sync ({force: true});
module.exports = Nota;