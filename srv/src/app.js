dotenv.config();
import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyCookie from '@fastify/cookie'; 
import fastifySession from '@fastify/session';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js';
import timerRoutes from './routes/timer.routes.js';
import taskRoutes from './routes/task.routes.js';

const fastify = Fastify({ pluginTimeout: 30000 });

// Habilitar CORS
fastify.register(fastifyCors, {
  origin: '/',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

// Registra o plugin de cookies primeiro
fastify.register(fastifyCookie, {});

// Registra o plugin de sessões depois
fastify.register(fastifySession, {
  secret: process.env.SECRET_SESSION,
  cookie: { secure: process.env.NODE_ENV === 'production' }, 
});

// Registro das rotas
fastify.register(userRoutes);
fastify.register(timerRoutes);
fastify.register(taskRoutes);

export default fastify;