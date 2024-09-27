import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import cookie from '@fastify/cookie';
import fastifySession from '@fastify/session'; // Importar o plugin de sessão
import fastifyflash from '@fastify/flash';
import userRoutes from './routes/user.routes.js';
import taskRoutes from './routes/task.routes.js';
import passportSetup from './config/passport.js';
import dotenv from 'dotenv';

dotenv.config();

const fastify = Fastify();

fastify.register(fastifyCors, { 
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

fastify.register(cookie);

fastify.register(fastifySession, {
  secret: process.env.SESSION_SECRET_KEY,
  cookie: { secure: false } // Defina como true em produção com HTTPS
});

fastify.register(fastifyflash);

passportSetup(fastify);

fastify.register(userRoutes);
fastify.register(taskRoutes); 

export default fastify;
