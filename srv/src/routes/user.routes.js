import { registerUser, loginUser} from '../controllers/user.controller.js';
import fastifyPassport from '@fastify/passport';

const userRoutes = (fastify, options, done) => {
  // Test route
  fastify.get('/status', async (request, reply) => {
    return { status: 'Server is up and running' };
  });

  // Route to register a user
  fastify.post('/register', async (request, reply) => {
    try {
      await registerUser(request, reply);
    } catch (error) {
      reply.status(500).send({ error: 'Error processing the request' });
    }
  });

  // Route for login
  fastify.post('/login', async (request, reply) => {
    try {
      await loginUser(request, reply);
    } catch (error) {
      reply.status(500).send({ error: 'Error processing the request' });
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

  done();
};

export default userRoutes;