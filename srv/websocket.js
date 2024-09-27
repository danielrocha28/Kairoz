import WebSocket from 'ws';
import http from 'http';
import dotenv from 'dotenv';
import fastify from './src/app';

dotenv.config();

const server = http.createServer();

const wss = new WebSocket.Server({ server });
fastify.register(wss);

// configurando servidor http
const port = process.env.WEBSOCKET_PORT;
server.listen(port, () => {
  console.log(`Servidor WebSocket ouvindo na porta ${port}`);
});

export default wss;
