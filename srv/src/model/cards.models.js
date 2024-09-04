const sequelize = require('./base');
const Sequelize = require('sequelize');


const Carta = sequelize.define('Carta',{
    frente:{
        type: Sequelize.STRING,
        allowNull: true
    },
    verso:{
        type: Sequelize.STRING,
        allowNull: true
    },
})


Carta.sync({force: true});


module.exports = Carta;