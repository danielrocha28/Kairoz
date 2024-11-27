import { registerUser, loginUser, updateProfile, deleteProfile, getUserByID } from '../controllers/user.controller.js';
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

  fastify.get('/profile', async  (request, reply) => {
    const token = (request.headers.authorization?.split(' ') ?? [])[0];

    try {
      const profile = await getUserByID(token);
      reply.status(200).send(profile);
    } catch (error) {
      logger.error('data not found:', error); 
      reply.status(500).send({ error: 'Error processing the request' });
    }
  });

  fastify.put('/profile', async (request, reply) => {
    try {
      await updateProfile(request, reply);
      logger.info('profile updated successfully'); 
    } catch (error) {
      logger.error('Error when updating user:', error);
      reply.status(500).send({ error: 'Error processing the request' });
    }
  });

  fastify.delete('/profile', async (request, reply) => {
    try {
      await deleteProfile(request, reply);
      logger.info('profile deleted successfully');
    } catch (error) {
      logger.error('Error when deleting user:', error);
      reply.status(500).send({ error: 'Error processing the request' });
    }
  });

  done();
};

export default userRoutes;
