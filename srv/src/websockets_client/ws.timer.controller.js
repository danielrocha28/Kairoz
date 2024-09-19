import WebSocket from '../../websocket';
import timerRouter from '../routes/timer.routes';

// Manipule eventos de conexão
WebSocket.on('connection', (ws) => {
  console.log('Novo cliente conectado');

  // Envie uma mensagem de boas-vindas para o cliente
  ws.send('Temporizador iniciado!');

  switch (timerRouter) {
    case 'https://kairoz.onrender.com/timer/start':
      ws.on("message", (message) => {
        console.log(`Mensagem recebida: ${message}`);
        
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
  }
});