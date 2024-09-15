const Fastify = require("fastify");
const fastify = Fastify({ logger: true });
const timerController = require("../controllers/timer.controller");

async function timerRouter(fastify, opts) {
  
  //Rota de iniciar o temporizador
  await fastify.post("/timer/start", async (request, reply) => {
    try {
      await timerController.startTimer(request, reply);
    } catch (error) {
      reply.status(500).send({
        error: "Erro ao processar a requisição",
        details: error.message,
      });
    }
  });

  //Rota de pausar o temporizador
  await fastify.put("/timer/pause", async (request, reply) => {
    try {
      await timerController.paused();
      await timerController.statusTimer(request, reply);
    } catch (error) {
      reply.status(500).send({
        error: "Erro ao processar a requisição",
        details: error.message,
      });
    }
  });

  //Rota de retomar o temporizador
  await fastify.put("/timer/resume", async (request, reply) => {
    try {
      await timerController.resumed();
      await timerController.statusTimer(request, reply);
    } catch (error) {
      reply.status(500).send({
        error: "Erro ao processar a requisição",
        details: error.message,
      });
    }
  });

  //Rota de deletar o temporizador
  await fastify.delete("/timer/delete", async (request, reply) => {
    try {
      await timerController.deleteTimer(request, reply);
    } catch (error) {
      reply.status(500).send({
        error: "Erro ao processar a requisição",
        details: error.message,
      });
    }
  });
}

module.exports = timerRouter;
