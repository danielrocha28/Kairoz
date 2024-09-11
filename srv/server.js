import fastify from './src/app.js';

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await fastify.listen({ port });
    console.log(`Application running on port: ${port}`);
  } catch (err) {
    console.error('Error starting the server:', err);
    process.exit(1);
  }
};

import sequelize from './src/config/database.js';

const testDatabaseConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been successfully established.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

start();
testDatabaseConnection();
