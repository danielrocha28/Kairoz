const sequelize = require("./models/base");
const Carta = require('./models/flashcard');



sequelize.sync({ alter: true }).then(() => {
    console.log('Modelos sincronizados com o banco de dados.');

   


async function criarCarta(req,reply) {
        try{
            const {frente,verso} = req.body;

            if(!frente || !verso || frente.trim() === '' || verso.trim() === '') {
                return reply.status(400).json({error:'Frente e o verso são obrigatórios'});

            }else{

            const novaCarta = await Carta.create({frente,verso});
            reply.status(201).json(novaCarta);
            }

        }catch(error){ 
            reply.status(500).json({error: 'Erro ao criar carta'})
            console.error(error, 'erro ao criar carta')};

    }
 });

 module.exports = criarCarta;
 