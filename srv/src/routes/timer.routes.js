import { startTimer, statusTimer, deleteTimer, paused, formatTime, getTime } from '../controllers/timer.controller.js';

function timerRouter(fastify, opts) {
  fastify.post('/timer/start', async (request, reply) => {
    try {
      const started = await startTimer(request, reply);
      if (started){
        reply.status(201).send();
      }
    } catch (error) {
      reply.status(500).send({
        error: 'Error processing the request',
        details: error.message,
      });
    }
  });

  fastify.get('/timer/start', (request, reply) => {
    try {
      const timer = {
        hours: startTimer.hours,
        minutes: startTimer.minutes,
        seconds: startTimer.seconds,
      };
      if (timer) 
        reply.status(200).send(timer);
    } catch (error) {
      reply.status(500).send({
        error: 'Error processing the request',
        details: error.message,
      });
    }
  });

  fastify.put('/timer/pause', async (request, reply) => {
    try {
      paused(true);
      await statusTimer(request, reply);
    } catch (error) {
      reply.status(500).send({
        error: 'Error processing the request',
        details: error.message,
      });
    }
  });

  
  fastify.get('/timer/pause', (request, reply) => {
    try {
      const check = paused(true);
      if (check){
      const timer = {
        hours: statusTimer.hours,
        minutes: statusTimer.minutes,
        seconds: statusTimer.seconds,
      };
        if (timer) 
          reply.status(200).send(timer);
      }
    } catch (error) {
      reply.status(500).send({
        error: 'Error processing the request',
        details: error.message,
      });

    }
  });

  fastify.put('/timer/resume', async (request, reply) => {
    try {
      paused(false);
      const resumed = await statusTimer(request, reply);
      if (resumed) {
        reply.status(200).send();
      }
    } catch (error) {
      reply.status(500).send({
        error: 'Error processing the request',
        details: error.message,
      });
    }
  });

  fastify.get('/timer/resume', (request, reply) => {
    try {
      const check = paused(false);
      if (check){
        const timer = {
          hours: statusTimer.hours,
          minutes: statusTimer.minutes,
          seconds: statusTimer.seconds,
        };
        if (timer)
          reply.status(200).send(timer);
      }
    } catch (error) {
       reply.status(500).send({
        error: 'Error processing the request',
        details: error.message,
    });
    }
  });

  fastify.delete('/timer/delete', async (request, reply) => {
    try {
      await deleteTimer(request, reply);
    } catch (error) {
      reply.status(500).send({
        error: 'Error processing the request',
        details: error.message,
      });
    }
  });

fastify.get('/timer/:id_time', async (request, reply) => {
      try {
        const timerId = parseInt(request.params.id_time, 10);
        if (isNaN(timerId)) {
          return reply.status(400).send({ error: 'Invalid timer ID' });
        }
        const time = await getTime(request, reply);
        return formatTime(time.total_time);
      } catch (error) {
        reply.status(500).send({
          error: 'Error processing the request',
          details: error.message });
      }
    });
  }
export default timerRouter;
