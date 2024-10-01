import ws from 'ws';
import dotenv from 'dotenv';
import Timer from '../model/timer.model.js';
import { Sequelize } from 'sequelize';

dotenv.config();

// Criando uma conexão com o servidor WebSocket
const WebSocket = new ws(process.env.WEBSOCKET_URL);

// Abrindo servidor lado cliente
WebSocket.on('open', () => {
  console.log('Conexão WebSocket aberta.');
});

// Mensagens enviadas pelo cliente
WebSocket.on('message', async (message) => {
   console.log("Mensagem recebida do WebSocket:", message);
  try {

    const messageWS = JSON.parse(message); // const que armazena as ações do cliente
    console.log('Mensagem recebida', messageWS);
  
  // switch que interage com o banco de dados de acordo com as ações do cliente
  switch (messageWS.action) {
    case "start":
      try {
        await Timer.update(
          { start_time: messageWS.timeStarted },
          { where: { id_time: messageWS.idTimer } }
        );
        console.log(
          `Timer ${messageWS.idTimer} iniciado com tempo: ${messageWS.timeStarted}`
        );
      } catch (error) {
        console.error("Erro ao iniciar o timer:", error);
      }
      break;

    case "pause":
      try {
        await Timer.update(
          {
            status_time: "Paused",
            end_time: messageWS.pausedTime, // Corrigido para usar o campo correto
            total_time: Sequelize.literal("end_time - start_time"),
          },
          { where: { id_time: messageWS.idTimer } }
        );
        console.log(
          `Timer ${messageWS.idTimer} pausado. Tempo pausado: ${messageWS.pausedTime}`
        );
      } catch (error) {
        console.error('Erro ao pausar o timer:', error);
      }
      break;

    case "resume":
      try {
        await Timer.update(
          { status_time: "Resumed", start_time: messageWS.resumedTime },
          { where: { id_time: messageWS.idTimer } }
        );
        console.log(
          `Timer ${messageWS.idTimer} retomado com tempo: ${messageWS.resumedTime}`
        );
      } catch (error) {
        console.error('Erro ao retomar o timer:', error);
      }
      break;
    default:
      WebSocket.send(JSON.stringify({ error: 'Ação não reconhecida' }));
  }
  } catch (error) {
    console.error('Erro ao processar a mensagem:', error);
    WebSocket.send(JSON.stringify({ error: 'Erro ao processar a ação.' }));
  }
});
// Caso o cliente se desconecte
WebSocket.on('close', () => {
  console.log('Conexão com o servidor WebSocket fechada');
});
// Caso houver algum erro com o server
WebSocket.on('error', (error) => {
  console.error('Erro na conexão WebSocket:', error);
});
// Exportando a instância do websocket para interagir com o cliente
export default WebSocket;