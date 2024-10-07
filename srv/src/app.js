import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyCookie from '@fastify/cookie'; 
import fastifySession from '@fastify/session';
import dotenv from 'dotenv';
import homeRouter from './routes/home.routes.js';
import userRoutes from './routes/user.routes.js';
import timerRoutes from './routes/timer.routes.js';
import taskRoutes from './routes/task.routes.js';
import flashcardRoutes from './routes/flashcard.routes.js';
import passportSetup from './config/passport.js';

dotenv.config();

const fastify = Fastify({ pluginTimeout: 30000 });
dotenv.config();

// Enable CORS
fastify.register(fastifyCors, {
  origin: 'https://kairoz.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
});


// Register the cookie plugin first
fastify.register(fastifyCookie, {});

// Register the session plugin afterwards
fastify.register(fastifySession, {
  secret: process.env.SECRET_SESSION,
  cookie: { secure: process.env.NODE_ENV === 'production' }, 
});

// Route registration
fastify.register(homeRouter);
fastify.register(userRoutes);
fastify.register(timerRoutes);
fastify.register(taskRoutes);
passportSetup(fastify);
fastify.register(flashcardRoutes);

export default fastify;
