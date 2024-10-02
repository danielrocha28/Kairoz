import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import homeRouter from './routes/home.routes.js';
import userRoutes from './routes/user.routes.js';
import taskRoutes from './routes/task.routes.js';

const fastify = Fastify();

fastify.register(fastifyCors, {
  origin: 'https://kairoz.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
});

fastify.register(homeRouter);
fastify.register(userRoutes);
fastify.register(taskRoutes); 

export default fastify;
