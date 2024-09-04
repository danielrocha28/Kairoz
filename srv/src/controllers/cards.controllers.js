const sequelize = require("./models/base");
const Carta = require('./models/flashcard');



sequelize.sync({ alter: true }).then(() => {
    console.log('Modelos sincronizados com o banco de dados.');


class Controlar{
    static async criarCarta(req,reply) {
        try{
            const {frente,verso} = req.body;


            const novaCarta = await Carta.create({frente,verso});
            reply.status(201).json(novaCarta);

        }catch(error){ 
            reply.status(500).json({error: 'Erro ao criar carta'})
            console.error(error, 'erro ao criar carta')};

    }
 }

 
fastify.get('/cartas', async (reply) => {
    try {
        const cartas = await Carta.findAll(); // Encontre todas as cartas
        reply.status(200).json(cartas);
    } catch (error) {
        reply.status(500).json({ error: 'Erro ao carregar cartas' });
    }
});


 fastify.post('/cartas', Controlar.criarCarta);

 fastify.listen(port, () => {  console.log(`Rodando na porta ${port}`);
 });
 });