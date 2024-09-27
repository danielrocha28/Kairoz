import { registerUser, loginUser } from '../controllers/user.controller.js';

const userRoutes = (fastify, options, done) => {
  // Rota de teste
  fastify.get('/status', async (request, reply) => {
    return { status: 'Server is up and running' };
  });

  // Rota para registrar o usuário
  fastify.post('/register', async (request, reply) => {
    try {
      console.log("Corpo da Requisição:", request.body);
      await registerUser(request, reply);
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao processar a requisição' });
    }
  });

  // Rota para login
  fastify.post('/login', async (request, reply) => {
    try {
      await loginUser(request, reply);
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao processar a requisição' });
    }
  });

  done();
};

export default userRoutes;
