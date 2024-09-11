import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import userRoutes from './routes/user.routes.js';

const fastify = Fastify();

fastify.register(fastifyCors, { 
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

fastify.register(userRoutes);

export default fastify;
