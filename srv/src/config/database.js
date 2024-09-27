import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();
console.log(process.env);

// Validation for required environment variables
const requiredEnvVars = ['DB_NAME', 'DB_USER', 'DB_PASS', 'DB_HOST', 'DB_PORT', 'DB_SSL'];
requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`The environment variable ${envVar} is required but not defined.`);
  }
});

// Check if environment variables are secure and in the correct format
if (process.env.DB_SSL !== 'true' && process.env.DB_SSL !== 'false') {
  throw new Error('The DB_SSL variable must be either "true" or "false".');
}

const isProduction = process.env.NODE_ENV === 'production';

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: process.env.DB_SSL === 'true' ? {
        require: true,
        rejectUnauthorized: !isProduction, // Reject unauthorized certificates in production
      } : false,
    },
    logging: isProduction ? false : console.log, // Log SQL queries only in development
  }
);

export default sequelize;
