const Timer = require("../model/timer.model");
const Task = require('../model/task.model');

let intervalid = undefined;
let endTime = 0;
let startTime = 0;
let totalTime = 0;
let pausedTime = 0;

let timerid = null ;
let pause = false;
let started = false;

  //Função para formatar o tempo em Hh:Mm:Ss:ms = (00:00:00:000)
  function formatTime(milisegundos) {
    const hours = String(Math.floor(milisegundos/ 3600000)).padStart(2, "0");
    const min = String(Math.floor((milisegundos % 3600000) / 60000)).padStart(2,"0");
    const seg = String(Math.floor((milisegundos % 60000) / 1000)).padStart(2,"0");
    const miliseg = String(milisegundos % 1000).padStart(3, "0");

    return `${hours}:${min}:${seg}:${miliseg}`;
  }

  //Função de iniciar o temporizador
  async function startTimer(request, reply) {
    try {
      started = true
      const { id_task } = request.body;
    
      const task = await Task.findOne({ where: { id_task } });
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
      intervalid = setInterval(() => { 
        elapsedTime = Date.now() - start; // Tempo decorrido em milissegundos 
        totalTime = startTime + elapsedTime;// Armazenando total do tempo

        console.log(formatTime(totalTime));//Saída

      }, 100); // Intervalo do temporizador em 100 milisegundo

      elapsedTime = 0;

      await reply.status(201).send({
        message: "Temporizador iniciado com sucesso",
        newTimer: {
          id_time: timerid,
          id_tarefa: newTimer.id_task,
          tarefa: Timer.id_task,
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
      if(started){ 
        startTimer() = null;
        started = false;
      }
    
  //Função de pausar temporizador
  async function pauseTimer(request, reply) {
    try {
      pause = true;

      if(resumeTimer){
      elapsedTime = totalTime + endTime
      }

      if(!timerid){
        return reply.status(400).send("Temporizador ainda não iniciado.");
      }

      clearInterval(intervalid);//função que pausa o loop

        elapsedTime = totalTime
        totalTime = 0;

        //tempo total decorrido gerido pela função startTimer
        pausedTime = Date.now() - new Date(elapsedTime); //Tempo decorrido = Date.now() - Tempo inicial
        elapsedTime = 0;

        //atualizando o banco de dados
        await Timer.update({ start_time: pausedTime }, { where: { id_time: timerid } });
        consol

        //retorno visual do temporizador contas para formatar em (Hh:Mm:Ss:ms)
        return reply.send.json({
          message: "Temporizador pausado",
          totalTime: formatTime(pausedTime)})
    } catch (error) {
      return reply
        .status(500)
        .send({
          error: "Ocorreu um erro ao pausar o temporizador.",
          message: error.message,
        })
      }
    } 

  //Função de retomar o temporizador
  async function resumeTimer(request, reply){
    try {
      if(pauseTimer){
        totalTime = pausedTime
      }

      if (!pause) {
        return reply.status(400).send('Não foi possível retomar, temporizador não está pausado');
      }

      pause = false;

        let resume = Date.now()

        //formula: novo tempo inicial = Date.now() - tempo decorrido
        intervalid = setInterval(() => {
        elapsedTime = Date.now() - new Date(totalTime);
        endTime = elapsedTime + resume;
        totalTime = 0;

          console.log("Temporizador : "+ formatTime(endTime) //Saída
        )}, 100); //Intervalo de 100 ms função setInterval

        reply.status(200).send("Temporizador retomado", formatTime(endTime));
      
      //Atualizando o banco de dados
      await Timer.update({ end_time: endTime, where: { id_time: timerid } });

      await reply.send({message: 'Temporizador :', Timer:{
        ID_temporizador: timerid,
        Tarefa: Timer.id_task,
        Temporizador: Timer.end_time,
      }})

    } catch (error) {
      console.error(error);
      return reply.status(500).send({
        error: "Não foi possível retomar o temporizador",
        message: error.message,
      });
    }
  }
  
  //função de salvar o tempo total
  async function saveTimer(request, reply){
    try {
      if(!activeTimers){
        return reply.status(404).send({message: 'Ocorreu um erro não encontro o temporizador',
        }).then(console.error(details.error))
      }

      if(!pause){
        return reply.status(500).send('Necessário pausar antes de salvar');
      
      } else {
        //Função de salvar automaticamente função beforeUptade arquivo "Model.timer.js"
        await Timer.Save({ where: { id_time: timerid }})

          await reply.status(200).send({
            message: "Temporizador salvo com sucesso.",
            Sucess: {
              id_temporizador: timerid,
              tarefa: Task.title,
              Tempo_total: Timer.total_time,
            },
          });
      }
    } catch (error) {
    console.error(error);
    return reply
      .status(500)
      .send({ error: "Ocorreu um erro ao salvar o temporizador." });
      
    }
  }

  //Função de deletar o temporizador
  async function deleteTimer(request, reply) {
    try {
      
      if(!timerid){
        reply.status.send('Temporizador não existe');
      }

      if (!pause) {
        reply.send('Necessário pausar antes de zerar');
      }

      await Timer.update({ total_time: null, where: timerid })

      await Timer.destroy.findByPk(timerid)
      return reply.status(200).send("Temporizador deletado.");
    
    } catch (error) {
      console.error(error);
      return reply
        .status(500)
        .send({ error: "Ocorreu um erro ao deletar o temporizador." });
    }
  }


  module.exports = {
    startTimer,
    pauseTimer,
    resumeTimer,
    saveTimer,
    deleteTimer,
    formatTime,
  };
