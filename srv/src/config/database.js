import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432,
    logging: console.log,
    dialectOptions: {
      ssl: {
        require: true, // Habilita o SSL
        rejectUnauthorized: false // Rejeita certificados não autorizados
      }
    },
    pool: {
      max: 7,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('The connection to the database was successfully established.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

export default sequelize;
