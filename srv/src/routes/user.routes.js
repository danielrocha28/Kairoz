<<<<<<< HEAD
const user = require('../controllers/user.controller');

const userRoutes = (fastify, options, done) => {
  
=======
import { registerUser, loginUser } from '../controllers/user.controller.js';

const userRoutes = (fastify, options, done) => {
>>>>>>> 4a152a40d614e80974ab4c402cffcf18b9f86314
  // Rota de teste
  fastify.get('/status', async (request, reply) => {
    return { status: 'Server is up and running' };
  });
<<<<<<< HEAD
  
=======

>>>>>>> 4a152a40d614e80974ab4c402cffcf18b9f86314
  // Rota para registrar o usuário
  fastify.post('/register', async (request, reply) => {
    try {
      console.log("Corpo da Requisição:", request.body);
<<<<<<< HEAD
      await user.registerUser(request, reply);
=======
      await registerUser(request, reply);
>>>>>>> 4a152a40d614e80974ab4c402cffcf18b9f86314
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao processar a requisição' });
    }
  });

  // Rota para login
  fastify.post('/login', async (request, reply) => {
    try {
<<<<<<< HEAD
      await user.loginUser(request, reply);
=======
      await loginUser(request, reply);
>>>>>>> 4a152a40d614e80974ab4c402cffcf18b9f86314
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao processar a requisição' });
    }
  });

  done();
};

<<<<<<< HEAD
module.exports = userRoutes;
=======
export default userRoutes;
>>>>>>> 4a152a40d614e80974ab4c402cffcf18b9f86314
