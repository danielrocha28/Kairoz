import Fastify from "fastify";
import timerController from "../controllers/timer.controller.js";

const fastify = Fastify({ logger: true });

async function timerRouter(fastify, opts) {
  // Rota de iniciar o temporizador
  fastify.post(
    "https://kairoz.onrender.com/timer/start",
    async (request, reply) => {
      try {
        await timerController.startTimer(request, reply);
      } catch (error) {
        reply.status(500).send({
          error: "Erro ao processar a requisição",
          details: error.message,
        });
      }
    }
  );

  // Rota de pausar o temporizador
  fastify.put(
    "https://kairoz.onrender.com/timer/pause",
    async (request, reply) => {
      try {
        await timerController.paused();
        await timerController.statusTimer(request, reply);
      } catch (error) {
        reply.status(500).send({
          error: "Erro ao processar a requisição",
          details: error.message,
        });
      }
    }
  );

  // Rota de retomar o temporizador
  fastify.put(
    "https://kairoz.onrender.com/timer/resume",
    async (request, reply) => {
      try {
        await timerController.resumed();
        await timerController.statusTimer(request, reply);
      } catch (error) {
        reply.status(500).send({
          error: "Erro ao processar a requisição",
          details: error.message,
        });
      }
    }
  );

  // Rota de deletar o temporizador
  fastify.delete(
    "https://kairoz.onrender.com/timer/delete",
    async (request, reply) => {
      try {
        await timerController.deleteTimer(request, reply);
      } catch (error) {
        reply.status(500).send({
          error: "Erro ao processar a requisição",
          details: error.message,
        });
      }
    }
  );
}

export default timerRouter;
