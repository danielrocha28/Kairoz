import { registerUser, loginUser, updateProfile, deleteProfile } from '../controllers/user.controller.js';
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

  /*
// botton from Google
fastify.get('/botton', (request, reply) => {
  const html = `
    <html><body>
      <button onclick="window.location.href='/auth/google'" style="background-color: #4285F4; color: white; border: none; padding: 12px 20px; font-size: 16px; border-radius: 4px; cursor: pointer; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); transition: background-color 0.3s;">
        Entrar com Google
      </button>
    </body></html>
  `;
  reply.type('text/html').send(html);
});
  */


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

  done();
};

export default userRoutes;
