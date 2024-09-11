const fastify = require("fastify")({logger: true});
const criarCarta = require("../controllers/cards.controllers");
const Carta = require("../model/cards.models");

const cartaRoutes = (fastify,options,done) =>{



fastify.get('/cartas', async (reply) => {
    try {
        const cartas = await Carta.findAll(); // Encontre todas as cartas
        reply.status(200).json(cartas);
    } catch (error) {
        reply.status(500).json({ error: 'Erro ao carregar cartas' });
    }
});

fastify.get('/cartas/:id', async (request, reply) => {
   try{
    const {id} = request.params;
    const cartaId = await Carta.findById(id);

    if(!cartaId){
        return reply.status(404).json({ error: ' carta não encontradas' });
    }
    res.json({frente: cartaId.frente, verso: cartaId.verso});

}catch (error){
   console.error(error);
   return reply.status(404).json({ message: ' Erro ao encontrar carta' });    
}
});


 fastify.post('/cartas',(request, reply) => {
   const cartas =  criarCarta();
   res.json(cartas);
 });
};

 module.exports = cartaRoutes;

 