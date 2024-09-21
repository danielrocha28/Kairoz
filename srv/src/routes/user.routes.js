import { registerUser, loginUser, googleCallback } from '../controllers/user.controller.js';
import { authGoogle, useGoogle} from '../config/passport.js';  

useGoogle();

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

  fastify.get('/google', async (request, reply) => {
    try{
      await googleUser(request, reply);
    }catch (error){
      reply.status(500).send({error: 'Erro ao processar a requisiçao'});
  }
  });

  fastify.get('/google/auth', async (request, reply) => {  
    try{
    await authGoogle(request, reply);
  }catch (error){
    reply.status(500).send({error: 'Erro ao processar a requisiçao'});
}
}); 

  

  fastify.get('/google/callback', async (request, reply) => {
    try{
      await googleCallback(request, reply);
    }catch (error){
      reply.status(500).send({error: 'Erro ao processar a requisiçao'});
  }
  }); 


  done();
};

export default userRoutes;
