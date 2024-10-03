import fastify from 'fastify';
import { startTimer, statusTimer, deleteTimer, resumed, paused, getTime } from '../controllers/timer.controller.js';

async function timerRouter(fastify, opts) {
  fastify.post(
    '/timer/start',
    async (request, reply) => {
      try {
        await startTimer(request, reply);
      } catch (error) {
        reply.status(500).send({
          error: 'Error processing the request',
          details: error.message,
        });
      }
    }
  );

  fastify.put(
    '/timer/pause',
    async (request, reply) => {
      try {
        await paused();
        await statusTimer(request, reply);
      } catch (error) {
        reply.status(500).send({
          error: 'Error processing the request',
          details: error.message,
        });
      }
    }
  );

  fastify.put(
    '/timer/resume',
    async (request, reply) => {
      try {
        await resumed();
        await statusTimer(request, reply);
      } catch (error) {
        reply.status(500).send({
          error: 'Error processing the request',
          details: error.message,
        });
      }
    }
  );

  fastify.delete(
    '/timer/delete',
    async (request, reply) => {
      try {
        await deleteTimer(request, reply);
      } catch (error) {
        reply.status(500).send({
          error: 'Error processing the request',
          details: error.message,
        });
      }
    }
  );
}

fastify.get(
    '/timer/time',
    async (request, reply) => {
      try {
        await getTime(request, reply);
      } catch (error) {
        reply.status(500).send({
          error: 'Error processing the request',
          details: error.message,
        });
      }
    }
  );

export default timerRouter;