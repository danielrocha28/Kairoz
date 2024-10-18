import ws from 'ws';
import dotenv from 'dotenv';
import logger from './src/config/logger.js'; 

dotenv.config();

const port = process.env.WEBSOCKET_PORT || 8000;

// Initializes the WebSocket server
const wss = new ws.Server({ port }, () => {
  logger.info(`WebSocket server listening on port ${port}`);
});

// Stores connected clients
const clients = new Set();

// Manages new connections
wss.on('connection', (ws) => {
  clients.add(ws);

  // Manages disconnection
  ws.on('close', () => {
    logger.info('Client disconnected');
    clients.delete(ws);
  });

  // Manages errors
  ws.on('error', (error) => {
    logger.info('An error occurred with the WebSocket', error.message);
  });

  // Manages messages received from clients
  ws.on('message', (message) => {
    const messageClient = JSON.parse(message); 
    ws.send(JSON.stringify(messageClient));

  });
});
// Exports the WebSocket server instance
export default wss;