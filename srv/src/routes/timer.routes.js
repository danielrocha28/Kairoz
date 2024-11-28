import { saveTotalTime, getTotalTime } from '../controllers/timer.controller.js';
import logger from '../config/logger.js';

const timerRouter = (fastify, options, done) => {

  // rota para armazenar o tempo gerado pelo timer
  fastify.put('timer/save', async (request, reply) => {
    try {
      await saveTotalTime(request, reply);
    } catch (error) {
      logger.error(error);
      reply.status(500).send({ error: 'Error processing request', details: error.message });
    }
  });

  // rota para pegar o total do tempo já armazenado
  fastify.get('timer/total', async (request, reply) => {
    try {
      const totalTime = await getTotalTime(request, reply);
      reply.status(200).send(totalTime);
    } catch (error) {
      logger.error(error);
      reply.status(500).send({ error: 'Error processing request', details: error.message });
    }
  });

  done();
};

export default timerRouter;
