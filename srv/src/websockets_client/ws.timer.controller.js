import WebSocket from '../../websocket';
import Timer from '../model/timer.model';
import { startTimer, statusTimer } from '../controllers/timer.controller.js'; // Importa funções do timer.controller
import { Sequelize } from 'sequelize';

async function getSession(request) {
  const cookies = request.headers.cookie;
  const sessionId = extractSession(cookies);

  if (!sessionId) {
    throw new Error("Sessão inválida ou não autenticada");
  }

  const session = await retrieveSession(sessionId);
  console.log("Sessão recuperada!", session);
  return session;
}

// Classe para armazenar todos os valores geridos pelo temporizador
class Session {
  constructor(sessionData) {
    this.timeStarted = sessionData.timeStarted;
    this.timePaused = sessionData.timePaused;
    this.idTimer = sessionData.idTimer;
    this.timeResumed = sessionData.timeResumed;
  }
}

// Função de extração do SessionId dos cookies
function extractSession(cookies) {
  const match = cookies.match(/sessionId=([^;]+)/);
  return match ? match[1] : null;
}

WebSocket.on('connection', async (request, ws) => {
  console.log('Novo cliente conectado');

  // Recupera a sessão do request
  const sessionData = await getSession(request);
  const session = new Session(sessionData); // Cria uma nova instância com os dados da sessão

  ws.on('message', async (message) => {
    const messageWS = JSON.parse(message);
    const action = messageWS.action;

    try {
      switch (action) {
        case "timer/start":
          // Chama a função para iniciar o temporizador
          await startTimer(request);
          // Atualiza o banco de dados para iniciar o temporizador
          await Timer.update({ start_time: session.timeStarted },
            { where: { id_time: session.idTimer } });
          ws.send(JSON.stringify({ message: "Temporizador pausado com sucesso!" }));
          break;

        case "timer/pause":
          // Chama a função para pausar o temporizador
          await statusTimer(request);
          // Atualiza o banco de dados se necessário
          await Timer.update({status_time: "Paused", end_time: session.timePaused,
              total_time: Sequelize.literal("end_time - start_time")},
              { where: { id_time: session.idTimer } });
          ws.send(JSON.stringify({ message: "Temporizador pausado com sucesso!" }));
          break;

        case "timer/resume":
          // Chama a função para retomar o temporizador
          await statusTimer(request);
          // Atualiza o banco de dados se necessário
          await Timer.update(
            { status_time: "Resumed", end_time: session.timeResumed },
            { where: { id_time: session.idTimer } }
          );
          ws.send(JSON.stringify({ message: "Temporizador retomado com sucesso!" }));
          break;

        default:
          ws.send(JSON.stringify({ error: `Ação não reconhecida: ${action}` }));
      }

      ws.on('close', (event) => {
        console.log('Conexão WebSocket fechada:', event.reason);
      });

      ws.on('error', (error) => {
        console.error('Erro no WebSocket:', error.message);
      });

    } catch (error) {
      console.error('Erro ao processar a ação:', error);
      ws.send(JSON.stringify({ error: `Erro ao processar a ação: ${error.message}` }));
    }
  });
});