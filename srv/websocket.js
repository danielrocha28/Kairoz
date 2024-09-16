import WebSocket from "ws";
import http from "http";
import dotenv from "dotenv";

dotenv.config();

const server = http.createServer();

const wss = new WebSocket.Server({ server });

// Manipule eventos de conexão
wss.on("connection", (ws) => {
  console.log("Novo cliente conectado");

  // Envie uma mensagem de boas-vindas para o cliente
  ws.send("Bem-vindo ao servidor WebSocket!");

  // Manipule mensagens recebidas do cliente
  ws.on("message", (message) => {
    console.log(`Mensagem recebida: ${message}`);
    // Envie a mesma mensagem de volta ao cliente (eco)
    ws.send(`Você disse: ${message}`);
  });

  // Manipule eventos de desconexão
  ws.on("close", () => {
    console.log("Cliente desconectado");
  });

  // Manipule eventos de erro
  ws.on("error", (error) => {
    console.error("Erro WebSocket:", error);
  });
});

// configurando servidor http
const port = process.env.WEBSOCKET_PORT;
server.listen(port, () => {
  console.log(`Servidor WebSocket ouvindo na porta ${port}`);
});

export default wss;
