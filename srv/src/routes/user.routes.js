import { registerUser, loginUser, updateProfile, blockingApps, deleteProfile } from '../controllers/user.controller.js';
import fastifyPassport from '@fastify/passport';
import logger from '../config/logger.js'; 
import User from '../model/user.model.js';


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

  fastify.get('/profile', (request, reply) => {
    try {
      const profile = {
        id: loginUser.id,
        name: loginUser.name,
        email: loginUser.email
      };
      if (profile){
        reply.status(200).send(profile);
      }
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

  fastify.put('/blocked-apps', {
  preHandler: async (request, reply) => {
    try {
      const apps = await User.findOne({
        where: { id_user: loginUser.id },
        attributes: ['blocked_apps'],
      });
      request.customData = { blocked_apps: apps.blocked_apps };
    } catch (error) {
      logger.error('Error fetching blocked apps:', error);
      reply.status(500).send({ error: 'Error processing the request' });
    }
  },

  handler: async (request, reply) => {
    try {
      await blockingApps(request, reply);
      reply.status(200).send({ message: 'Apps updated successfully' });
    } catch (error) {
      logger.error('Error blocking apps:', error);
      reply.status(500).send({ error: 'Error processing the request' });
    }
  },
});

  done();
};

export default userRoutes;
