import Fastify from 'fastify';
import homeRouter from "./routes/home.routes.js"; 
import userRoutes from './routes/user.routes.js';
import timerRouter from './routes/timer.routes.js';
import fastifyCookie from '@fastify/cookie';
import dotenv from 'dotenv';
import fastifyCors from "@fastify/cors";
//import fastifySession from '@fastify/session';
//import Redis from 'ioredis';
//import connectRedis from 'connect-redis';

const fastify = Fastify({ pluginTimeout: 30000 });

// Habilitar CORS
fastify.register(fastifyCors, {
  origin: 'https://kairoz.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
},{ prefix: '/'});

// Registro do plugin de cookies
fastify.register(fastifyCookie);

/*
// Configuração de sessões
const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

// Cria uma instância do RedisStore com 'connect-redis'
const store = new connectRedis({
  client: redisClient, // Usa o cliente Redis configurado
  disableTouch: true,
});

// Configura o 'fastify-session' com RedisStore
fastify.register(fastifySession, {
  secret: process.env.SECRET_REDIS,
  store, // Aqui estamos usando o RedisStore
  cookie: {
    secure: false, // Em produção, true se usar HTTPS
  },
  saveUninitialized: false,
  resave: false,
});
*/

// Registro das rotas
fastify.register(homeRouter);
fastify.register(userRoutes);
fastify.register(timerRouter);

dotenv.config();

export default fastify;
