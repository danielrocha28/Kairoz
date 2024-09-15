<<<<<<< HEAD
const fastify = require('./src/app')

const port = process.env.PORT || 3000

const start = async () => {
  try {
    await fastify.listen({ port })
    console.log(`Application Running on port: ${port}`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

start()
=======
import fastify from './src/app.js';
import sequelize from './src/config/database.js';

const host = '0.0.0.0';  // Defina o host
const port = process.env.PORT || 3000;  // Defina a porta

const start = async () => {
  try {
    // Inicie o servidor Fastify com host e porta
    await fastify.listen({ port, host });
    console.log(`Application running on http://${host}:${port}`);
  } catch (err) {
    console.error('Error starting the server:', err);
    process.exit(1);
  }
};

const testDatabaseConnection = async () => {
  try {
    // Testa a conexão com o banco de dados
    await sequelize.authenticate();
    console.log('Connection to the database has been successfully established.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

// Iniciar o servidor e testar a conexão com o banco de dados
start();
testDatabaseConnection();
>>>>>>> 4a152a40d614e80974ab4c402cffcf18b9f86314
