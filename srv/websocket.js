import ws from "ws";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.WEBSOCKET_PORT || 8080;

// Inicializa o servidor WebSocket
const wss = new ws.Server({ port }, () => {
  console.log(`Servidor WebSocket ouvindo na porta ${port}`);
});

// Armazena clientes conectados
const clients = new Set();

// Gerencia novas conexões
wss.on('connection', (ws) => {
  console.log('Novo cliente conectado');
  clients.add(ws);

  // Gerencia a desconexão
  ws.on('close', () => {
    console.log('Cliente desconectado');
    clients.delete(ws);
  });

  // Gerencia erros
  ws.on('error', (error) => {
    console.log('Ocorreu um erro com o WebSocket', error.message);
  });

  // Gerencia mensagens recebidas dos clientes
  ws.on('message', (message) => {
    console.log('Mensagem recebida do cliente:', message);
  });
});

// Exporta a instância do servidor WebSocket
export default wss;