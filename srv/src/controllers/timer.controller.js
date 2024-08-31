const Timer = require("../model/timer.model");
let pause = false;
let intervalid = 0;
let Miliseg = 0;
let seg = 0;
let min = 0;
let hours = 0;

async function startTimer(req, reply) {
  try {
    const { id_task } = req.body;

    const task = await Timer.findOne({ where: { id_task } });

    if (!task) {
      return reply
        .status(404)
        .send("Por favor, crie uma tarefa para iniciar o temporizador.");
    }

    const newTimer = await Timer.create({
      id_task,
      start_time: new Date(),
      end_time: null,
      total_time: 0,
    });

    intervalid = setInterval(() => {
      if (!pause) {
        Miliseg++;

        if (Miliseg === 1000) {
          seg += 1;
          Miliseg = 0;
        }
        if (seg === 60) {
          min += 1;
          seg = 0;
        }
        if (min === 60) {
          hours += 1;
          min = 0;
        }

        reply.send(
          "Timer count " + hours + " : " + min + " : " + seg + " : " + Miliseg
        );
      }
    }, 1); // Intervalo do temporizador em 1 milisegundo

    return reply
      .status(201)
      .send({ message: "Temporizador iniciado com sucesso", newTimer });
  } catch (error) {
    console.error(error);
    return reply
      .status(500)
      .send({ error: "Não foi possível iniciar o temporizador" });
  }
}

function pauseTimer(req, reply) {
  try {
    if (!intervalid) {
      return reply.status(400).send("Temporizador ainda não iniciado.");
    }

    pause = true;
    clearInterval(intervalid);
    return reply.send("Temporizador pausado.");
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ error: "Ocorreu um erro ao pausar o temporizador." });
  }
}

function resumeTimer(req, reply) {
  try {
    if (!pause) {
      return reply.status(400).send("Temporizador não está pausado.");
    }

    pause = false;
    intervalid = setInterval(() => {
      // Retomar o temporizador
    }, 1);

    return reply.send("Temporizador retomado.");
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ error: "Ocorreu um erro ao retomar o temporizador." });
  }
}

function deleteTimer(req, reply) {
  try {
    if (!pause) {
      clearInterval(intervalid);
    }
    const endTime = Date.now();
    const totalTime = endTime - Miliseg;

    

    return reply.send("Temporizador deletado.");
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
  deleteTimer,
};
