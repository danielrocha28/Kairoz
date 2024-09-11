const Fastify = require("fastify");
const fastify = Fastify({ logger: true });
const timerController = require("../controllers/timer.controller");

async function timerRouter(fastify, opts) {
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

  await fastify.put("/timer/pause", async (request, reply) => {
    try {
      await timerController.pauseTimer(request, reply); 
    
    } catch (error) {
      reply.status(500).send({
        error: "Erro ao processar a requisição",
        details: error.message,
      });
    }
  });

  await fastify.put("/timer/resume", async (request, reply) => {
    try {
      await timerController.resumeTimer(request, reply); 
    } catch (error) {
      reply.status(500).send({
        error: "Erro ao processar a requisição",
        details: error.message,
      });
    }
  });

  await fastify.put("/timer/save", async (request,reply) =>{
    try {
      await timerController.saveTimer(request,reply);
       const { id_task } = request.body;
    } catch (error) {
        reply.status(500).send({
          error: "Erro ao processar a requisição",
          details: error.message,
        });
    }
  })

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
