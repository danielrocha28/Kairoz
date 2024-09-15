<<<<<<< HEAD
// Importar o Fastify e o plugin @fastify/cors
const Fastify = require('fastify');
const fastifyCors = require('@fastify/cors');

// Criar uma instância do Fastify
const fastify = Fastify();

// Importar rotas
const userRoutes = require('./routes/user.routes');
const timerRoutes = require('./routes/timer.routes');

// Registrar plugins
fastify.register(fastifyCors, {
  // Opções de configuração do CORS
  origin: '*', // Permitir todas as origens
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
});

//Plugin para interpretar JSON
fastify.addContentTypeParser("application/json",{ parseAs: "string" },
  (req, body, done) => {
    try {
      const json = JSON.parse(body);
      done(null, json);
    } catch (err) {
      done(err, undefined);
    }
  }
);

// Registrar rotas
fastify.register(userRoutes); // Registrar as rotas importadas
fastify.register(timerRoutes);;

// Iniciar o servidor
const start = async () => {
  try {
    await fastify.listen({ port: 3000 }); // Substitua pela porta que desejar
    console.log(`Servidor rodando na porta 3000`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Iniciar o servidor
start();

// Exportar a instância do Fastify, se necessário para testes ou outras funcionalidades
module.exports = fastify;
=======
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
>>>>>>> 4a152a40d614e80974ab4c402cffcf18b9f86314
