import fastify from './src/app.js'; // Importa a instância já criada
import sequelize from './src/config/database.js';
import wss from './websocket.js';

const host = '0.0.0.0';
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await testDatabaseConnection(); 
    await wss();
    await fastify.listen({ port, host });
    console.log(`Application running on http://${host}:${port}`);
  } catch (err) {
    console.error('Error starting the server:', err);
    process.exit(1);
  }
};

const testDatabaseConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      'Connection to the database has been successfully established.'
    );
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};
start();
