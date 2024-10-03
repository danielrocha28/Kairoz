import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import cookie from '@fastify/cookie';
import fastifySession from '@fastify/session'; // Importar o plugin de sessão
import userRoutes from './routes/user.routes.js';
import taskRoutes from './routes/task.routes.js';
import cardsRoutes from './routes/cards.routes.js';
import passportSetup from './config/passport.js';
import dotenv from 'dotenv';

dotenv.config();

const fastify = Fastify();

fastify.register(fastifyCors, { 
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

fastify.register(cookie);

// Registra o plugin de sessões depois
fastify.register(fastifySession, {
  secret: process.env.SECRET_SESSION,
  cookie: { secure: process.env.NODE_ENV === 'production' }, 
});


passportSetup(fastify);

fastify.register(userRoutes);
fastify.register(taskRoutes); 
fastify.register(cardsRoutes);

export default fastify;
