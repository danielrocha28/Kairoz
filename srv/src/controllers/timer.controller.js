import Timer from '../model/timer.model.js';
import Task from '../model/task.model.js';
import WebSocket from '../websockets_client/ws.timer.controller.js'; // WebSocket client
import logger from '../config/logger.js';

// Class for active timers
class ActiveTimers {
  constructor() {
    this.endTime = 0;
    this.startTime = 0;
    this.totalTime = 0;
    this.pausedTime = 0;
    this.interval = null;
    this.task = null;
    this.timerid = null;
    this.pause = false;
    this.started = false;
    this.ws = WebSocket; // Storing in a variable to send messages to the server
    this.day = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];
    this.date = new Date().getDay();
    this.getId = null;
  }
}

const active = new ActiveTimers();

// Function to format time in Hh:Mm:Ss = (00:00:00)
export function formatTime(milliseconds) {
  const hours = String(Math.floor(milliseconds / 3600000)).padStart(2, '0');
  const minutes = String(Math.floor((milliseconds % 3600000) / 60000)).padStart(2, '0');
  const seconds = String(Math.floor((milliseconds % 60000) / 1000)).padStart(2, '0');
  return { hours, minutes, seconds };
}

export function paused(isPaused) {
  active.pause = isPaused;
  return isPaused;
}

export async function startTimer(request, reply) {
  try {
    const { id_task, title,} = request.body;

    let task = await Task.findAll({ where: { id_task, title, category: 'study' } });

    if (task.length === 0) {
      reply.status(404).send('Please create a task to start the timer.');
    }

    const newTimer = await Timer.create({
      id_task,
      status_time: null,
      start_time: 0,
      end_time: 0,
      total_time: 0,
    });
    const timer = await Timer.findOne({ where: { id_task } });

    // Condition to nullify the start function after initialization
    if (active.started === true && timer !== null) {
      throw new Error('Timer already in progress.');
    }

    request.session.idTimer = active.timerid = newTimer.id_time;
    active.task = timer.id_task;
    active.started = true;

    const start = Date.now();

    active.interval = setInterval(() => {
      const elapsedTime = Date.now() - start;
      active.totalTime = active.startTime + elapsedTime;
      const { hours, minutes, seconds } = formatTime(active.totalTime);

      // Sending a message to the WebSocket server via JSON
      active.ws.send(JSON.stringify({
        action: 'start',
        id: active.timerid,
        function: active.totalTime,
        day: active.day[active.date],
        timer:{
          hours,
          minutes,
          seconds,
        },
      }));

    }, 1000);
  } catch (error) {
    logger.error(error);
    return reply.status(500).send({ error: 'Could not start the timer', message: error.message, });
  }
}

// Function to pause/resume the timer
export function statusTimer(request, reply) {
  try {
    if (!active.timerid) {
      active.timerid = active.getId.id_time; 

      if (!active.getId || !active.timerid) {
        return reply.status(400).send('Timer has not started yet.');
      }
    }

    // Logic to pause the timer
    if (active.pause) { // pause time
      active.pause = true;
      clearInterval(active.interval);

      // Calculate pausedTime
      active.pausedTime = active.totalTime + active.endTime;
      active.totalTime = 0;
      active.endTime = 0;
      const { hours, minutes, seconds } = formatTime(active.pausedTime);

      // Message for the WebSocket
      active.ws.send(
        JSON.stringify({
          action: 'pause',
          id: active.timerid,
          function: active.pausedTime,
          day: active.day[active.date],
        })
      );

      // Return paused status and formatted total time
      reply.status(200).send(hours, minutes, seconds);
    } else { // resume time
      active.pause = false;

      const start = Date.now() - active.pausedTime; // Resume from the paused point
      active.pausedTime = 0;

      active.interval = setInterval(() => {
        const elapsedTime = Date.now() - start; // Update elapsed time
        active.endTime = active.pausedTime + elapsedTime;
        const { hours, minutes, seconds } = formatTime(active.endTime);

        // Message for the WebSocket
        active.ws.send(
          JSON.stringify({
            action: 'resume',
            id: active.timerid,
            function: active.endTime,
            day: active.day[active.date],
            timer: {
              hours,
              minutes,
              seconds,
            },
          }));
      }, 1000);
    }
  } catch (error) {
    logger.error('Error in statusTimer:', error); // Log the error with more context
    reply.status(500).send({
      error: 'An error occurred while pausing or resuming the timer.',
      message: error.message,
    });
  }
}

export async function deleteTimer(request, reply) {
  try {
    if (!active.timerid) {
      return reply.status(404).send('Timer does not exist');
    }

    if (!active.pause) {
      return reply.send('Need to pause before resetting');
    }

    await Timer.destroy({ where: { id_time: active.timerid } });
    reply.status(200).send('Timer deleted.');
  } catch (error) {
    logger.error(error);
    return reply.status(500).send({ error: 'An error occurred while deleting the timer.' });
  }
}

// Call in case the server crashes or needs to retrieve total time
export async function getTime(request, reply) {
  try {
    if (active.getId === null) {
      const { id_time } = request.params || active.timerid;
      active.getId = await Timer.findOne({ where: { id_time, status_time: 'Paused' } });
    } else {
      active.pausedTime = active.getId.total_time;
    }

    if (!active.getId.id_time) {
      reply.status(404).send('Timer does not exist');
    }
    return active.getId;
  } catch (error) {
    logger.error('Error retrieving total time:', error); // Log the error
    reply.status(500).send({ error: 'Could not retrieve the total time' });
  }
}
formatTime(); // Calling the function to make time variables accessible