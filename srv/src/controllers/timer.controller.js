const Timer = require("../model/timer.model");
const Task = require('../model/task.model');
const WebSocket = require('../../websocket.js');

let intervalid = null;
let endTime = 0;
let startTime = 0;
let totalTime = 0;
let pausedTime = 0;


let task = null;
let timerid = null ;
let pause = false;
let started = false;

  //Função para formatar o tempo em Hh:Mm:Ss = (00:00:00)
  function formatTime(milisegundos) {
   const hours = String(Math.floor(milisegundos/ 3600000)).padStart(2, "0");
   const min = String(Math.floor((milisegundos % 3600000) / 60000)).padStart(2,"0");
   const seg = String(Math.floor((milisegundos % 60000) / 1000)).padStart(2,"0");

    return `${hours}:${min}:${seg}`;
  }

  async function paused(pause){
    pause = true;
  }
  async function resumed(pause){
    pause = false;
  }

  //Função de iniciar o temporizador
  async function startTimer(request, reply) {
    try {
      started = true
      const { id_task, title } = request.body;
    
      task = await Task.findAll({ where: { id_task, title } });
      console.log("Tarefa encontrada:", task);

      if (!task) {
        return reply
          .status(404)
          .send("Por favor, crie uma tarefa para iniciar o temporizador.");
      }

      const newTimer = await Timer.create({
        id_task,
        start_time: 0,
        end_time: 0,
        total_time: 0,
      });

      timerid = newTimer.id_time;
      const start = Date.now();
      
      //Aplicando a formula: (tempo decorrido = (Date.now() -> gerador) - tempo inicial)
      intervalid = setInterval( async () => { 
        elapsedTime = Date.now() - start; // Tempo decorrido em milissegundos 
        totalTime = startTime + elapsedTime;// Armazenando total do tempo

         await Timer.update({ start_time: totalTime },
          { where: { id_time: timerid }});

        console.log(formatTime(totalTime))
      }, 100);// Intervalo do temporizador em 100 milisegundo

     
      elapsedTime = 0;


      await reply.status(201).send({
        message: "Temporizador iniciado com sucesso",
        newTimer: {
          id_time: timerid,
          id_tarefa: task.id_task,
          tarefa: task.title,
          temporizador: formatTime(totalTime),
        },
      });

    } catch (error) {
      console.error(error);
      return reply
        .status(500)
        .send({
          error: "Não foi possível iniciar o temporizador",
          message: error.message,
        });
    }
  }
      //Condição de anular a função de start após sua inicialização;
      if(started && timerid != null){ 
        startTimer() = null;
        started = false;
      }
    
  //Função de pausar/retomar o temporizador
  async function statusTimer(request, reply) {
  try {
    if (!timerid) {
      return reply.status(400).send("Temporizador ainda não iniciado.");
    }

    // Verifica se o temporizador está pausado ou em execução
    if (!pause) {
      pause = true;

      clearInterval(intervalid); // Pausa o loop
      pausedTime = totalTime + endTime; // Armazena o tempo total decorrido até a pausa
      totalTime = 0;
      endTime = 0;

      // Atualiza o banco de dados com o estado "Pausado"
      await Timer.update(
        { status_time: "Pausado", total_time: pausedTime },
        { where: { id_time: timerid } }
      );

      // Retorna o status de pausa e o tempo decorrido formatado
      return reply.send({
        message: "Temporizador pausado",
        totalTime: formatTime(pausedTime),
      });
    } else{
      pause = false;
      // Retomar o temporizador
        const start = Date.now() - pausedTime; // Retoma a partir do ponto pausado
        pausedTime = 0;

      intervalid = setInterval(async () => {
        elapsedTime = Date.now() - start; // Atualiza o tempo decorrido
        endTime = pausedTime + elapsedTime; // subtrai o tempo pausado e o tempo decorrido

        // Atualiza o banco de dados com o novo tempo total
        await Timer.update(
          { status_time: "Retomado", end_time: endTime },
          { where: { id_time: timerid } }
        );

        // Exibe o tempo formatado no console
        console.log("Temporizador: " + formatTime(endTime));
      }, 100); // Intervalo de 100 ms

      // Retorna o status de retomada e o tempo decorrido
      return reply.send({
        message: "Temporizador retomado",
        totalTime: formatTime(endTime),
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
      //Função de deletar o temporizador
      async function deleteTimer(request, reply) {
        try {
          
          if(!timerid){
            reply.status(404).send('Temporizador não existe');
          }

          if (!pause) {
            reply.send('Necessário pausar antes de zerar');
          }

          await Timer.destroy({ where: { id_time: timerid }})
          return reply.status(200).send("Temporizador deletado.");
        
        } catch (error) {
          console.error(error);
          return reply.status(500).send({ error: "Ocorreu um erro ao deletar o temporizador." });
        }
      }
    

  module.exports = {
    startTimer,
    statusTimer,
    deleteTimer,
    formatTime,
    paused,
    resumed,
  }
