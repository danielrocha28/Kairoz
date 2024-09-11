const user = require('../controllers/user.controller');

const userRoutes = (fastify, options, done) => {

  // Rota de teste
  fastify.get('/status', async (request, reply) => {
    return { status: 'Server is up and running' };
  });

  // Rota para registrar o usuário
  fastify.post('/register', async (request, reply) => {
    try {
      console.log("Corpo da Requisição:", request.body);
      await user.registerUser(request, reply);
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao processar a requisição' });
    }
  });

  // Rota para login
  fastify.post('/login', async (request, reply) => {
    try {
      await user.loginUser(request, reply);
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao processar a requisição' });
    }
  });

  done();
};

module.exports = userRoutes;
