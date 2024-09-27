import Fastify from 'fastify';
import homeRouter from './routes/home.routes.js';
import userRoutes from './routes/user.routes.js';
import timerRouter from './routes/timer.routes.js';
import taskRoutes from './routes/task.routes.js';
import fastifyCookie from '@fastify/cookie';
import dotenv from 'dotenv';
import fastifyCors from '@fastify/cors';
import fastifySession from '@fastify/session';
dotenv.config();

const fastify = Fastify({ pluginTimeout: 30000 });

// Habilitar CORS
fastify.register(
  fastifyCors,
  {
    origin: 'https://kairoz.onrender.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
  { prefix: '/' }
);


// Registro do plugin de cookies
fastify.register(fastifyCookie);

// Registro do plugin de sessões
fastify.register(fastifySession, {
  secret: 'cNaoPYAwF60HZJzkcNaoPYAwF60HZJzk',
  cookie: { secure: false }, // Defina para true em produção se estiver usando HTTPS
  saveUninitialized: false,
  resave: false
});

// Rota para definir a sessão
fastify.get('/set-session', (request, reply) => {
  request.session.user = { name: 'John Doe' }; // Armazena dados na sessão
  reply.send({ message: 'Sessão criada!' });
});

// Rota para obter a sessão
fastify.get('/get-session', (request, reply) => {
  const user = request.session.user;
  reply.send(user || { message: 'Nenhuma sessão encontrada.' });
});


// Registro das rotas
fastify.register(homeRouter);
fastify.register(userRoutes);
fastify.register(timerRouter);
fastify.register(taskRoutes);

export default fastify;
