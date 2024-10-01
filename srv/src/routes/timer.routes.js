import { startTimer, statusTimer, deleteTimer, resumed, paused } from '../controllers/timer.controller.js';

  async function timerRouter(fastify, opts) {
  // Rota de iniciar o temporizador
  fastify.post(
    '/timer/start',
    async (request, reply) => {
      try {
        await startTimer(request, reply);
      } catch (error) {
        reply.status(500).send({
          error: 'Erro ao processar a requisição',
          details: error.message,
        });
      }
    }
  );

  // Rota de pausar o temporizador
  fastify.put(
    '/timer/pause',
    async (request, reply) => {
      try {
        await paused();
        await statusTimer(request, reply);
      } catch (error) {
        reply.status(500).send({
          error: 'Erro ao processar a requisição',
          details: error.message,
        });
      }
    }
  );

  // Rota de retomar o temporizador
  fastify.put(
    '/timer/resume',
    async (request, reply) => {
      try {
        await resumed();
        await statusTimer(request, reply);
      } catch (error) {
        reply.status(500).send({
          error: 'Erro ao processar a requisição',
          details: error.message,
        });
      }
    }
  );

  // Rota de deletar o temporizador
  fastify.delete(
    '/timer/delete',
    async (request, reply) => {
      try {
        await deleteTimer(request, reply);
      } catch (error) {
        reply.status(500).send({
          error: 'Erro ao processar a requisição',
          details: error.message,
        });
      }
    }
  );
}

export default timerRouter;