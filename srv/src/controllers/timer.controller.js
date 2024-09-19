import Timer from "../model/timer.model.js";
import Task from "../model/task.model.js";
import { Sequelize } from "sequelize";

class activeTimers {

  constructor(id) {
this.endTime = 0;
this.startTime = 0;
this.totalTime = 0;
this.pausedTime = 0;

this.task = null;
this.timerid = id;
this.pause = false;
this.started = false;
  }
}

// Função para formatar o tempo em Hh:Mm:Ss = (00:00:00)
function formatTime(milisegundos) {
  const hours = String(Math.floor(milisegundos / 3600000)).padStart(2, "0");
  const min = String(Math.floor((milisegundos % 3600000) / 60000)).padStart(2,"0");
  const seg = String(Math.floor((milisegundos % 60000) / 1000)).padStart(2,"0");

  return `${hours}:${min}:${seg}`;
}

export async function paused() {
  activeTimers.pause = true;
}

export async function resumed() {
  activeTimers.pause = false;
}

// Função de iniciar o temporizador
export async function startTimer(request, reply) {
  try {
    const { id_task, title } = request.body;

    let task = await Task.findAll({ where: { id_task, title } });

    if (!task) {
      return reply
        .status(404)
        .send("Por favor, crie uma tarefa para iniciar o temporizador.");
    }

    const activeTimers = new activeTimers();
    activeTimers.task = task;

    const newTimer = await Timer.create({
      id_task,
      start_time: 0,
      end_time: 0,
      total_time: 0,
    });

    activeTimers.started = true;

    activeTimers.timerid = newTimer.id_time;
    const start = Date.now();

    // Aplicando a fórmula: (tempo decorrido = (Date.now() -> gerador) - tempo inicial)
    activeTimers.timerid = setInterval(async () => {
      const elapsedTime = Date.now() - start; // Tempo decorrido em milissegundos
      activeTimers.totalTime = activeTimers.startTime + elapsedTime; // Armazenando total do tempo

      await Timer.update(
        //Salvando no banco de dados
        { start_time: totalTime },
        { where: { id_time: activeTimers.timerid } }
      );

      console.log(formatTime(totalTime));
    }, 1000); // Intervalo do temporizador em 1000 milissegundos
  

    await reply.status(201).send({
      message: "Temporizador iniciado com sucesso",
      newTimer: {
        id_time: activeTimers.timerid,
        id_tarefa: activeTimers.task.id_task,
        tarefa: activeTimers.task.title,
        temporizador: formatTime(activeTimers.totalTime),
      },
    });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({
      error: "Não foi possível iniciar o temporizador",
      message: error.message,
    });
  }
}

// Condição de anular a função de start após sua inicialização
if (activeTimers.started && activeTimers.timerid !== null) {
  startTimer = null;
  started = false;
}

// Função de pausar/retomar o temporizador
export async function statusTimer(request, reply) {
  try {
    if (!activeTimers.timerid) {
      return reply.status(400).send("Temporizador ainda não iniciado.");
    }

    // Verifica se o temporizador está pausado ou em execução
    if (!activeTimers.pause) {
      activeTimers.pause = true;

      clearInterval(activeTimers.timerid); // Pausa o loop
      // Armazena o tempo total decorrido até a pausa
      activeTimers.pausedTime = activeTimers.totalTime + activeTimers.endTime;
      activeTimers.totalTime = 0;
      activeTimers.endTime = 0;

      // Atualiza o banco de dados com o estado "Pausado"
      await Timer.update(
        { status_time: "Paused", end_time: activeTimers.pausedTime },
        { totalTime: Sequelize.literal('end_time - start_time')},
        { where: { id_time: activeTimers.timerid } }
      );
      await Timer.u

      // Retorna o status de pausa e o tempo decorrido formatado
      return reply.send({
        message: "Temporizador pausado",
        totalTime: formatTime(activeTimers.pausedTime),
      });
    } else {
      activeTimers.pause = false;
      // Retomar o temporizador
      const start = Date.now() - activeTimers.pausedTime; // Retoma a partir do ponto pausado
      activeTimers.pausedTime = 0;

      activeTimers.timerid = setInterval(async () => {
        const elapsedTime = Date.now() - start; // Atualiza o tempo decorrido
        activeTimers.endTime = // soma o tempo pausado e o tempo decorrido
        activeTimers.pausedTime + elapsedTime; 

        // Atualiza o banco de dados com o valor 
        await Timer.update(
          { status_time: "Resumed", start_time: activeTimers.endTime },
          { where: { id_time: activeTimers.timerid } }
        );
        await Timer.calculateTime();

        // Exibe o tempo formatado no console
        console.log("Temporizador: " + formatTime(activeTimers.endTime));
      }, 1000); // Intervalo de 1000 ms

      // Retorna o status de retomada e o tempo decorrido
      return reply.send({
        message: "Temporizador retomado",
        totalTime: formatTime(activeTimers.endTime),
      });
    }
  } catch (error) {
    console.error(error);
    return reply.status(500).send({
      error: "Ocorreu um erro ao pausar ou retomar o temporizador.",
      message: error.message,
    });
  }
}

// Função de deletar o temporizador
export async function deleteTimer(request, reply) {
  try {
    if (!activeTimers.timerid) {
      return reply.status(404).send("Temporizador não existe");
    }

    if (!activeTimers.pause) {
      return reply.send("Necessário pausar antes de zerar");
    }

    await Timer.destroy({ where: { id_time: activeTimers.jtimerid } });
    return reply.status(200).send("Temporizador deletado.");
  } catch (error) {
    console.error(error);
    return reply
      .status(500)
      .send({ error: "Ocorreu um erro ao deletar o temporizador." });
  }
}

export default formatTime;
