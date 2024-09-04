const fastify = require("fastify")({logger: true});

const port = 3000;


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
 