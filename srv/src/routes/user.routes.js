import { registerUser, loginUser} from '../controllers/user.controller.js';
import fastifyPassport from '@fastify/passport';

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


  fastify.get('/auth/google', { 
    preValidation: fastifyPassport.authenticate('google', { 
      scope: ['profile', 'email'] 
    }) 
  }, (request, reply) => {}
);
  

fastify.get('/auth/google/callback', { preValidation: fastifyPassport.authenticate('google', { failureRedirect: '/' }) }, (request, reply) => {
});


  
  



  /*fastify.get('/', (request, reply) => {
    reply
      .header('Content-Type', 'text/html')
      .send(`
        <h1>Login com Google</h1>
        <a href="/auth/google">
          <button style="padding: 10px; font-size: 16px;">Login com Google</button>
        </a>
      `);
  });
  */
  

  done();
};

export default userRoutes;
