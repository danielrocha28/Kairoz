import { startTimer, statusTimer, deleteTimer, resumed, paused } from '../controllers/timer.controller.js';
import WebSocket  from '../../websocket.js';

async function timerRouter(fastify, opts) {
  // Rota de iniciar o temporizador
  fastify.post("/timer/start", async (request, reply) => {
    try {
      await startTimer(request, reply);
      // Envia mensagem ao WebSocket para atualizar os campos da sessão
      WebSocket.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(
            JSON.stringify({
              action: "timer/start",
              idTimer: request.session.idTimer,
              titleTask: request.session.titleTask,
              timeStarted: request.session.timeStarted,
            })
          );
        }
      });
    } catch (error) {
      reply.status(500).send({
        error: "Erro ao processar a requisição",
        details: error.message,
      });
    }
  });

  // Rota de pausar o temporizador
  fastify.put("/timer/pause", async (request, reply) => {
    try {
      await paused();
      await statusTimer(request, reply);
      // Envia mensagem ao WebSocket para atualizar os campos da sessão
      WebSocket.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(
            JSON.stringify({
              action: "timer/pause",
              idTimer: request.session.idTimer,
              timePaused: request.session.timePaused,
            })
          );
        }
      });
    } catch (error) {
      reply.status(500).send({
        error: "Erro ao processar a requisição",
        details: error.message,
      });
    }
  });

  // Rota de retomar o temporizador
  fastify.put("/timer/resume", async (request, reply) => {
    try {
      await resumed();
      await statusTimer(request, reply);
      // Envia mensagem ao WebSocket para atualizar os campos da sessão
      WebSocket.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(
            JSON.stringify({
              action: "timer/resume",
              idTimer: request.session.idTimer,
              timeResumed: request.session.timeResumed,
            })
          );
        }
      });
    } catch (error) {
      reply.status(500).send({
        error: "Erro ao processar a requisição",
        details: error.message,
      });
    }
  });

  // Rota de deletar o temporizador
  fastify.delete("/timer/delete", async (request, reply) => {
    try {
      await deleteTimer(request, reply);
      // Envia mensagem ao WebSocket para indicar que o temporizador foi deletado
      WebSocket.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(
            JSON.stringify({
              action: "timer/delete",
              idTimer: request.session.idTimer,
            })
          );
        }
      });
    } catch (error) {
      reply.status(500).send({
        error: "Erro ao processar a requisição",
        details: error.message,
      });
    }
  });
}

export default timerRouter;