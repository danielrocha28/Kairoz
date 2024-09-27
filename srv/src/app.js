import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import userRoutes from './routes/user.routes.js';
import taskRoutes from './routes/task.routes.js';

const fastify = Fastify();

fastify.register(fastifyCors, { 
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

fastify.register(userRoutes);
fastify.register(taskRoutes); 

export default fastify;
