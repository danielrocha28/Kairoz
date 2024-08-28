//CONTROLADOR DO TEMPORIZADOR 
const Timer = require('../model/timer.model');
const pause = false;
const { z } = require('zod');
const intervalid = 0;
let Miliseg = Date.now();
let seg = 0;
let min = 0;
let hours = 0;

function isNumber(value,unit){
    if(typeof value !== 'number' || value < 0){
        return false;
    }
}

async function startTimer(fastify,opts){
try{
  const { id_time, id_task } = req.body;

  const notTask = await Timer.findOne({ where: id_task })

  if(!notTask){
    reply.status(404).send('Por favor criar uma tarefa para iniciar')
  }

  const newTimer = Timer.create({ id_time, id_task})
    const start = void function(){

    intervalid = setInterval(() => {
      Miliseg++;

      if (Miliseg === 1000) {
        seg += 1;
        Miliseg = 0;
      } else if (seg === 60) {
        min += 1;
        seg = 0;
      } else if (min === 60) {
        hours += 1;
        min = 0;
      }
      console.log(
        "Timer count " + hours + " : " + min + " : " + seg + " : " + Miliseg
      );
    }, 1000);
  }
  reply.status(201).send([
    message('Timer started sucessfuly'),
    newTimer.id_task,
    newTimer.id_time,
     start]);

}catch (error){
   reply.status(500).send({ error: 'Não foi possível concluir a operação'});
};
};


function pauseTimer(fastify,opts){
try{
  if(intervalid != null){
    reply.status(400).send('Temporizador ainda não iniciado');
  }
  else if(pause == true){
  clearInterval(intervalid)
  const { start_time } = intervalid
};
} catch (error){
  reply.status(500).send({ error: 'Ocorreu um erro'});
};
};


function resumeTimer(fastify,opts){
if(!pause){
intervalid += startTimer;
}
};


function deleteTimer(fastify,opts){
if(pause){
clearInterval(intervalid)
let endTime = Date.now();
endTime - startTimer; 
}
}

module.exports ={
  startTimer,
};