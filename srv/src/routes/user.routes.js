<<<<<<< HEAD
const Fastify = require('fastify');
const fastify = Fastify({ logger: true});
const user  = require('../controllers/user.controller');
=======
const user = require('../controllers/user.controller');
>>>>>>> main

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

<<<<<<< HEAD
async function userRouter(fastify,opts){ 

 fastify.post('/register/:email', async (request, reply) => {
  const { email } = request.params;
    await (user.registerUser,{ email }, reply)
 });

 fastify.post('/register', async (request,reply) => {
  const { email, password } = request.body;
   await user.registerUser({ email, password }, reply);
 });

 fastify.post('/login', async (request,reply,) => {
    const { email, password } = request.body;
    await user.loginUser({ email, password }, reply);
 });
}
module.exports = userRouter;
=======
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
>>>>>>> main
