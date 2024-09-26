import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import cookie from '@fastify/cookie';
import session from '@fastify/session'; // Importar o plugin de sessão
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

// Registrando o plugin de sessão
fastify.register(session, {
  secret: process.env.SESSION_SECRET_KEY, // Altere para uma chave secreta real
  saveUninitialized: false,
  cookie: { secure: false } // Altere para true em produção
});


passportSetup(fastify);

fastify.register(userRoutes);
fastify.register(taskRoutes); 

export default fastify;
