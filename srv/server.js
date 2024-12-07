import fastify from './src/app.js';
import sequelize from './src/config/database.js';
import logger from './src/config/logger.js';

const host = '0.0.0.0';
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await testDatabaseConnection();
    await fastify.listen({ port, host });
    logger.info(`Application running on http://${host}:${port}`); 
  } catch (err) {
    logger.error('Error starting the server:', err); 
    process.exit(1);
  }
};

const testDatabaseConnection = async () => {
  try {
    await sequelize.authenticate();
    logger.info('Connection to the database has been successfully established.');
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

start();
