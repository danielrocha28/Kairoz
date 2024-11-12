import { createTask, getTasks, getTaskById, updateTask, deleteTask } from '../controllers/task.controller.js';
import logger from '../config/logger.js'; 


const taskRoutes = (fastify, options, done) => {
  
  fastify.post('/tasks', async (request, reply) => {
    try {
      const { title, category } = request.body; 
      if (!title || !category) {
        return reply.status(400).send({ error: 'Title and category are required' });
      }
      await createTask(request, reply);
    } catch (error) {
      logger.error(error);
      reply.status(500).send({ error: 'Error processing request', details: error.message });
    }
  });

  fastify.get('/tasks', async (request, reply) => {
    try {
      await getTasks(request, reply);
    } catch (error) {
      logger.error(error);
      reply.status(500).send({ error: 'Error processing request', details: error.message });
    }
  });

  fastify.get('/tasks/:id', async (request, reply) => {
    try {
      const taskId = parseInt(request.params.id, 10);
      if (isNaN(taskId)) {
        return reply.status(400).send({ error: 'Invalid task ID' });
      }
      await getTaskById(request, reply);
    } catch (error) {
      logger.error(error);
      reply.status(500).send({ error: 'Error processing request', details: error.message });
    }
  });

  fastify.put('/tasks/:id', async (request, reply) => {
    try {
      const taskId = parseInt(request.params.id, 10);
      if (isNaN(taskId)) {
        return reply.status(400).send({ error: 'Invalid task ID' });
      }
      await updateTask(request, reply);
    } catch (error) {
      logger.error(error);
      reply.status(500).send({ error: 'Error processing request', details: error.message });
    }
  });

  fastify.delete('/tasks/:id', async (request, reply) => {
    try {
      const taskId = parseInt(request.params.id, 10);
      if (isNaN(taskId)) {
        return reply.status(400).send({ error: 'Invalid task ID' });
      }
      await deleteTask(request, reply);
    } catch (error) {
      logger.error(error);
      reply.status(500).send({ error: 'Error processing request', details: error.message });
    }
  });

  done();
};

export default taskRoutes;
