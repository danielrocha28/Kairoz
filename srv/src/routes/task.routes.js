import { createTask, getTasks, getTaskById, updateTask, deleteTask,
getListId, getStudyTopic, IdTopicOrTask } from '../controllers/task.controller.js';
import logger from '../config/logger.js'; 


const taskRoutes = (fastify, options, done) => {
  
  //rotas para tasks em geral
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

  // rotas para topicos de estudo

  //rota que pega todos os tópicos de estudo
  fastify.get('/study-topic', async (request, reply) => {
    try {
      await getStudyTopic(request, reply);
    } catch (error) {
      logger.error(error);
      reply.status(500).send({ error: 'Error processing request', details: error.message });
    }
  });

  //rota que trás os id e o titulo em uma lista 
  fastify.get('/study-topic-list', async (request, reply) => {
    try {
      await getListId(request, reply);
    } catch (error) {
      logger.error(error);
      reply.status(500).send({ error: 'Error processing request', details: error.message });
    }
  });

  //rota que trás o id de acordo com o titulo que é preenchido no corpo da requisição
  fastify.get('/study-topic-id', async (request, reply) => {
    try {
      await IdTopicOrTask(request, reply);
    } catch (error) {
      logger.error(error);
      reply.status(500).send({ error: 'Error processing request', details: error.message });
    }
  });

  done();
};

export default taskRoutes;
