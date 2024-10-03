import ws from 'ws';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.WEBSOCKET_PORT || 8080;

// Initializes the WebSocket server
const wss = new ws.Server({ port }, () => {
  console.log(`WebSocket server listening on port ${port}`);
});

// Stores connected clients
const clients = new Set();

// Manages new connections
wss.on('connection', (ws) => {
  clients.add(ws);

  // Manages disconnection
  ws.on('close', () => {
    console.log('Client disconnected');
    clients.delete(ws);
  });

  // Manages errors
  ws.on('error', (error) => {
    console.log('An error occurred with the WebSocket', error.message);
  });

  // Manages messages received from clients
  ws.on('message', (message) => {
    const messageClient = JSON.parse(message); // const that stores client actions
    ws.send(JSON.stringify({
      action: messageClient.action,
      id: messageClient.id,
      function: messageClient.function,
    }));
  });
});

// Exports the WebSocket server instance
export default wss;