const Fastify = require("fastify");
const fastify = Fastify({ logger: true });
const timer = require("../controllers/timer.controller");

async function timerRouter(fastify, opts) {
    fastify.post('/timer', async (request, reply) => {
    try {
      console.log("Corpo da Requisição:", request.body);
      await timer.startTimer(request, reply);
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao processar a requisição' });
    }
  });
}


module.exports = timerRouter;
