import WebSocket from 'ws'; 
import dotenv from 'dotenv';
import logger from './src/config/logger.js'; 

dotenv.config();

const port = process.env.WEBSOCKET_PORT || 8080;

const wss = new WebSocket.Server({ port }, () => {
  logger.info(`WebSocket server listening on port ${port}`);
});

const clients = new Set();

wss.on('connection', (ws) => {
  clients.add(ws);
  logger.info('New client connected');

  ws.on('close', () => {
    logger.info('Client disconnected');
    clients.delete(ws);
  });

  ws.on('error', (error) => {
    logger.error('An error occurred with the WebSocket:', error.message);
  });

  ws.on('message', (message) => {
    try {
      const messageClient = JSON.parse(message);
      logger.info('Received message from client:', messageClient);

      // Send the same message to client 
      ws.send(JSON.stringify(messageClient));
    } catch (error) {
      logger.error('Error parsing message from client:', error.message);
      ws.send(JSON.stringify({ error: 'Invalid message format' })); 
    }
  });
});

export default wss;
