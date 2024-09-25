import { createTask, getTasks, getTaskById, updateTask, deleteTask } from '../controllers/task.controller.js';

const taskRoutes = (fastify, options, done) => {

  fastify.post('/tasks', async (request, reply) => {
    try {
      await createTask(request, reply);
    } catch (error) {
      reply.status(500).send({ error: 'Error processing request' });
    }
  });

  fastify.get('/tasks', async (request, reply) => {
    try {
      await getTasks(request, reply);
    } catch (error) {
      reply.status(500).send({ error: 'Error processing request' });
    }
  });

  fastify.get('/tasks/:id', async (request, reply) => {
    try {
      await getTaskById(request, reply);
    } catch (error) {
      reply.status(500).send({ error: 'Error processing request' });
    }
  });

  fastify.put('/tasks/:id', async (request, reply) => {
    try {
      await updateTask(request, reply);
    } catch (error) {
      reply.status(500).send({ error: 'Error processing request' });
    }
  });

  fastify.delete('/tasks/:id', async (request, reply) => {
    try {
      await deleteTask(request, reply);
    } catch (error) {
      reply.status(500).send({ error: 'Error processing request' });
    }
  });

  done();
};

export default taskRoutes;
