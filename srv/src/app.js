import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import userRoutes from './routes/user.routes.js';
import timerRouter from './routes/timer.routes.js';
import redis from '@fastify/redis';
import fastifySession from 'fastify-session';
import fastifyCookie from '@fastify/cookie';
import dotenv from 'dotenv';

const fastify = Fastify();
dotenv.config();

fastify.register(redis, {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379,
});


fastify.register(fastifyCookie);
fastify.register(fastifySession, {
  secret: process.env.REDIS_KEY,
  cookie: { secure: false }, // secure: true em produção com HTTPS
  store: fastify.redis, // Usa o Redis como store de sessão
  saveUninitialized: false,
  resave: false,
});

fastify.register(fastifyCors, { 
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

fastify.register(userRoutes);
fastify.register(timerRouter);

export default fastify;
