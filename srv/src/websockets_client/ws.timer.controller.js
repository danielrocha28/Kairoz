import WebSocket from '../../websocket';
import Timer from '../model/timer.model';
import { Sequelize } from 'sequelize';

class sessions {
  constructor(request) {
    this.timeStarted = request.session.timeStarted;
    this.timePaused = request.session.timePaused;
    this.idTimer = request.session.idTimer;
    this.timeResumed = request.session.timeResumed;
  }
}

// Manipule eventos de conexão
WebSocket.on('connection', (request, ws) => {
  console.log('Novo cliente conectado');

  const session = new sessions(request);

  ws.on('message', async (message) => {
    const data = JSON.parse(message); // Supondo que você está enviando um JSON com uma ação
    const action = data.action;

    try {
      switch (action) {
        case 'start':
          await Timer.update(
            { start_time: session.timeStarted },
            { where: { id_time: session.idTimer } }
          );
          ws.send('Temporizador iniciado com sucesso!');
          break;

        case 'pause':
          await Timer.update(
            { status_time: 'Paused', end_time: session.timePaused },
            { total_time: Sequelize.literal('end_time - start_time')},
            { where: { id_time: session.idTimer } },
          );
          ws.send('Temporizador pausado com sucesso!');
          break;

        case 'resume':
          await Timer.update(
            { status_time: 'Resumed', start_time: session.timeResumed },
            { where: { id_time: session.idTimer } }
          );
          ws.send('Temporizador retomado com sucesso!');
          break;

        case 'delete':
          await Timer.destroy({ where: { id_time: session.idTimer } });
          ws.send('Temporizador deletado com sucesso!');
          break;

        default:
          ws.send(`Ação não reconhecida: ${action}`);
      }
    } catch (error) {
      console.error('Erro ao atualizar o temporizador:', error);
      ws.send(`Erro ao processar a ação: ${error.message}`);
    }
  });

  ws.on('close', () => {
    console.log('Cliente desconectado');
  });

  ws.on('error', (error) => {
    console.error('Erro WebSocket:', error);
  });
});
