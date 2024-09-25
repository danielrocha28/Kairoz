import Timer from '../model/timer.model.js';
import Task from '../model/task.model.js';

class ActiveTimers {
  constructor() {
    this.endTime = 0;
    this.startTime = 0;
    this.totalTime = 0;
    this.pausedTime = 0;
    this.task = null;
    this.timerid = null;
    this.pause = false;
    this.started = false;
    this.time = {
      hours: null,
      minutes: null,
      seconds: null,
    };
  }
}

const active = new ActiveTimers();

// Função para formatar o tempo em Hh:Mm:Ss = (00:00:00)
function formatTime(active, milisegundos) {
  active.time.hours = String(Math.floor(milisegundos / 3600000)).padStart(2,'0');
  active.time.minutes = String(Math.floor((milisegundos % 3600000) / 60000)).padStart(2,'0');
  active.time.seconds = String(Math.floor((milisegundos % 60000) / 1000)).padStart(2, '0');

  return `${active.time.hours}:${active.time.minutes}:${active.time.seconds}`;
}

export async function paused() {
  active.pause = true;
}

export async function resumed() {
  active.pause = false;
}

// Função de iniciar o temporizador
export async function startTimer(request, reply) {
  try {
    const { id_task, title } = request.body;

    let task = await Task.findAll({ where: { id_task, title } });

    if (!task) {
      return reply
        .status(404)
        .send('Por favor, crie uma tarefa para iniciar o temporizador.');
    }

    const newTimer = await Timer.create({
      id_task,
      start_time: 0,
      end_time: 0,
      total_time: 0,
    });

    request.session.idTimer = active.timerid = newTimer.id_task;
    active.started = true;
    active.task = task;

    const start = Date.now();

    active.timerid = setInterval(async () => {
      const elapsedTime = Date.now() - start;
      active.totalTime = active.startTime + elapsedTime;
      request.session.timeStarted = active.totalTime;

      console.log(formatTime(active, active.totalTime));
    }, 1000);

    await reply.status(201).send({
      message: 'Temporizador iniciado com sucesso',
      newTimer: {
        id_time: active.activeId,
        id_tarefa: active.task.id_task,
        tarefa: active.task.title,
        temporizador: formatTime(active, active.totalTime),
      },
    });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({
      error: 'Não foi possível iniciar o temporizador',
      message: error.message,
    });
  }
}

// Condição de anular a função de start após sua inicialização
if (active.started && active.timerid !== null) {
  startTimer = null;
  active.started = false;
}

// Função de pausar/retomar o temporizador
export async function statusTimer(request, reply) {
  try {
    if (!active.timerid) {
      return reply.status(400).send('Temporizador ainda não iniciado.');
    }

    // Verifica se o temporizador está pausado ou em execução
    if (!active.pause) {
      active.pause = true;

      clearInterval(active.timerid); // Pausa o loop
      // Armazena o tempo total decorrido até a pausa
      active.pausedTime = active.totalTime + active.endTime;
      active.totalTime = 0;
      active.endTime = 0;
      request.session.timePaused = active.pausedTime;

      // Retorna o status de pausa e o tempo decorrido formatado
      return reply.send({
        message: 'Temporizador pausado',
        totalTime: formatTime(active, active.pausedTime),
      });
    } else {
      active.pause = false;
      // Retomar o temporizador
      const start = Date.now() - active.pausedTime; // Retoma a partir do ponto pausado
      active.pausedTime = 0;

      active.timerid = setInterval(async () => {
        const elapsedTime = Date.now() - start; // Atualiza o tempo decorrido
        active.endTime = active.pausedTime + elapsedTime;
        request.session.timeResumed = active.endTime;

        // Exibe o tempo formatado no console
        console.log('Temporizador: ' + formatTime(active, active.endTime));
      }, 1000);

      // Retorna o status de retomada e o tempo decorrido
      return reply.send({
        message: 'Temporizador retomado',
        totalTime: formatTime(active, active.endTime),
      });
    }
  } catch (error) {
    console.error(error);
    return reply.status(500).send({
      error: 'Ocorreu um erro ao pausar ou retomar o temporizador.',
      message: error.message,
    });
  }
}

// Função de deletar o temporizador
export async function deleteTimer(request, reply) {
  try {
    if (!active.timerid) {
      return reply.status(404).send('Temporizador não existe');
    }

    if (!active.pause) {
      return reply.send('Necessário pausar antes de zerar');
    }

    await Timer.destroy({ where: { id_time: active.timerid } });
    return reply.status(200).send('Temporizador deletado.');
  } catch (error) {
    console.error(error);
    return reply
      .status(500)
      .send({ error: 'Ocorreu um erro ao deletar o temporizador.' });
  }
}

export default formatTime;
