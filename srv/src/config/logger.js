import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info', //logger info = status 202, logger error = status 202 
  transport: {
    target: 'pino-pretty', 
    options: {
      colorize: true
    }
  }
});

export default logger;
