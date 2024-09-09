// Eslint falou que const já não é mais usada troquem 
import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';


// Criar uma instância do Fastify
const fastify = Fastify();

// Importar rotas
import userRoutes from './routes/user.routes.js';



// Registrar plugins
fastify.register(fastifyCors, {
  // Opções de configuração do CORS
  origin: '*', // Permitir todas as origens
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
});

// Registrar rotas
fastify.register(userRoutes); // Registrar as rotas importadas
//fastify.register(task);

// Iniciar o servidor mas isso deve ser feito no server
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
export default fastify;
