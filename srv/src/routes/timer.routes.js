const Fastify = require("fastify");
const fastify = Fastify({ logger: true });
const timerController = require("../controllers/timer.controller");

async function timerRouter(fastify, opts) {
  fastify.get("/status", async (request, reply) => {
    return "Rota funcionando!";
  });

  fastify.post("/timer/start", async (request, reply) => {
    try {
      await timerController.startTimer(request, reply);
    } catch (error) {
      reply.status(500).send({ error: "Erro ao processar a requisição" });
    }
  });

  fastify.post("/timer/pause", async (request, reply) => {
    try {
      timerController.pauseTimer(request, reply);
    } catch (error) {
      reply.status(500).send({ error: "Erro ao processar a requisição" });
    }
  });

  fastify.post("/timer/resume", async (request, reply) => {
    try {
      timerController.resumeTimer(request, reply);
    } catch (error) {
      reply.status(500).send({ error: "Erro ao processar a requisição" });
    }
  });

  fastify.delete("/timer/delete", async (request, reply) => {
    try {
      timerController.deleteTimer(request, reply);
    } catch (error) {
      reply.status(500).send({ error: "Erro ao processar a requisição" });
    }
  });
}

module.exports = timerRouter;
