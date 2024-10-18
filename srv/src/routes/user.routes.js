import { registerUser, loginUser } from '../controllers/user.controller.js';
import fastifyPassport from '@fastify/passport';
import logger from '../config/logger.js'; 

  const userRoutes = (fastify, options, done) => {
    fastify.get('/status', (request, reply) => {
      logger.info('Status check requested');
      return { status: 'Server is up and running' };
    });

  fastify.post('/register', async (request, reply) => {
    try {
      await registerUser(request, reply);
      logger.info('User registered successfully'); // Loga sucesso no registro
    } catch (error) {
      logger.error('Error registering user:', error); // Loga o erro
      reply.status(500).send({ error: 'Error processing the request' });
    }
  });

 
  fastify.post('/login', async (request, reply) => {
    try {
      await loginUser(request, reply);
      logger.info('User logged in successfully'); // Loga sucesso no login
    } catch (error) {
      logger.error('Error logging in user:', error); // Loga o erro
      reply.status(500).send({ error: 'Error processing the request' });
    }
  });

  fastify.get('/auth/google', {
    preValidation: fastifyPassport.authenticate('google', {
      scope: ['profile', 'email']
    })
  }, (request, reply) => {
    logger.info('Google authentication requested');
   
    reply.send({ message: 'Redirecting to Google for authentication...' });
  });

  fastify.get('/auth/google/callback', {
    preValidation: fastifyPassport.authenticate('google', { failureRedirect: '/' })
  }, (request, reply) => {
    logger.info('Google authentication callback received');
    reply.redirect('/'); 
  });

  done();
};

export default userRoutes;
