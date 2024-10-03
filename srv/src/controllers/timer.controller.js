import Timer from '../model/timer.model.js';
import Task from '../model/task.model.js';
import WebSocket from '../websockets_client/ws.timer.controller.js'; // WebSocket client

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
  }
}

const active = new ActiveTimers();

// Function to format time in Hh:Mm:Ss = (00:00:00)
export function formatTime(active, milliseconds) {
  const hours = String(Math.floor(milliseconds / 3600000)).padStart(2, '0');
  const minutes = String(Math.floor((milliseconds % 3600000) / 60000)).padStart(2, '0');
  const seconds = String(Math.floor((milliseconds % 60000) / 1000)).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

export async function paused() {
  active.pause = true;
}

export async function resumed() {
  active.pause = false;
}

export async function startTimer(request, reply) {
  try {
    const { id_task, title } = request.body;

    let task = await Task.findAll({ where: { id_task, title } });

    if (!task) {
      return reply.status(404).send('Please create a task to start the timer.');
    }

    const newTimer = await Timer.create({
      id_task,
      status_time: null,
      start_time: 0,
      end_time: 0,
      total_time: 0,
    });

    request.session.idTimer = active.timerid = newTimer.id_time;
    active.started = true;
    active.task = task;
    request.session.titleTask = active.task;

    const start = Date.now();

    active.interval = setInterval(async () => {
      const elapsedTime = Date.now() - start;
      active.totalTime = active.startTime + elapsedTime;
      request.session.timeStarted = active.totalTime;

      // Sending a message to the WebSocket server via JSON
      active.ws.send(JSON.stringify({
        action: 'start',
        id: active.timerid,
        function: active.totalTime,
      }));

      return formatTime(active, active.totalTime);
    }, 1000);

    await reply.status(201).send({
      message: 'Timer started successfully',
      newTimer: {
        id_time: active.activeId,
        id_task: active.task.id_task,
        task: active.task.title,
        timer: formatTime(active, active.totalTime),
      },
    });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({
      error: 'Could not start the timer',
      message: error.message,
    });
  }
}

// Condition to nullify the start function after initialization
if (active.started && active.timerid !== null) {
  reply.send('Timer already started.');
}


// Function to pause/resume the timer
export async function statusTimer(request, reply) {
  try {
    if (!active.timerid) {
      return reply.status(400).send('Timer has not started yet.');
    }

    if (!active.started) {
      return reply.status(400).send('Cannot pause a timer that hasn\'t started.');
    }

    if (active.pause) {
      active.pause = true;
      clearInterval(active.interval); // Pause the loop
      // Store the total elapsed time until paused
      active.pausedTime = active.totalTime + active.endTime;
      active.totalTime = 0;
      active.endTime = 0;
      request.session.timePaused = active.pausedTime;
      // Message to the WebSocket
      active.ws.send(JSON.stringify({
        action: 'pause',
        id: active.timerid,
        function: active.pausedTime,
      }));
      // Return the paused status and the elapsed time formatted
      return reply.send({
        message: 'Timer paused',
        totalTime: formatTime(active, active.pausedTime),
      });
    } else {
      active.pause = false;
      // Resume the timer
      const start = Date.now() - active.pausedTime; // Resume from the paused point
      active.pausedTime = 0;

      active.interval = setInterval(async () => {
        const elapsedTime = Date.now() - start; // Update the elapsed time
        active.endTime = active.pausedTime + elapsedTime;
        request.session.timeResumed = active.endTime;

        // Message to the WebSocket
        active.ws.send(JSON.stringify({
          action: 'resume',
          id: active.timerid,
          function: active.endTime,
        }));

        // Display the formatted time in the console
        return formatTime(active, active.endTime);
      }, 1000);

      // Return the resumed status and the elapsed time
      return reply.send({
        message: 'Timer resumed',
        totalTime: formatTime(active, active.endTime),
      });
    }
  } catch (error) {
    console.error(error);
    return reply.status(500).send({
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
    return reply.status(200).send('Timer deleted.');
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ error: 'An error occurred while deleting the timer.' });
  }
}

formatTime(); // Calling the function to make time variables accessible