import WebSocket from '../../websocket';
import Timer from "../model/timer.model";
import timerRouter from "../routes/timer.routes";
import { Sequelize } from "sequelize";

class sessions {
  constructor(request) {
    this.timeStarted = request.session.timeStarted;
    this.timePaused = request.session.timePaused;
    this.idTimer = request.session.idTimer;
    this.timeResumed = request.session.timeResumed;
  }
}

// Manipule eventos de conexão
WebSocket.on("connection", (request, ws) => {
  console.log("Novo cliente conectado");

  if (request.session && request.session.idTimer) {
    console.log("Sessão e temporizador encontrado");
  } else {
    console.log("Sessão não encontrada");
  }

  const session = new sessions(request);

  ws.on("message", async (message) => {
    switch (timerRouter) {
      case "/timer/start":
        await Timer.update(
          { start_time: session.timeStarted },
          { where: { id_time: session.idTimer } }
        );
        ws.send(`Você disse: ${message}`);
        break;

      case "/timer/pause":
        // Atualiza o banco de dados com o estado "Pausado"
        await Timer.update(
          { status_time: "Paused", end_time: session.timePaused },
          { totalTime: Sequelize.literal("end_time - start_time") },
          { where: { id_time: session.idTimer } }
        );
        ws.send(`Você disse: ${message}`);
        break;

      case "/timer/resume":
        // Atualiza o banco de dados com o valor
        await Timer.update(
          { status_time: "Resumed", start_time: session.timeResumed },
          { where: { id_time: session.idTimer } }
        );
        ws.send(`Você disse: ${message}`);
        break;

      case "/timer/delete":
        ws.on("close", () => {
          console.log("Cliente desconectado");
        });
        break;
    }
  });

  ws.on("error", (error) => {
    console.error("Erro WebSocket:", error);
  });
});
