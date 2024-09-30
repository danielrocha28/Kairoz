import WebSocket from 'ws';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.WEBSOCKET_PORT;

const wss = () => { new WebSocket.Server({ port }) 
  console.log(`Servidor WebSocket ouvindo na porta ${port}`);
};

export default wss;
