import Task from '../model/task.model.js';
import { loginUser as user } from './user.controller.js';
import { handleServerError } from './task.controller.js';

export async function saveTotalTime(request, reply) {
  try {
    const { total_time, day_update } = request.body;
    const totalTime = await Task.update(total_time, day_update, { 
      where: { title: request.body.title, id_user: user.id }});
      if (totalTime){
        reply.status(200).send(totalTime);
      }
  } catch (error) {
    handleServerError(error, reply);
  }
}

export async function getTotalTime(request, reply) {
  try {
    const existingTask = await Task.findOne({ where: { title: request.body.title,
      id_user: user.id }});
    if (!existingTask){
      reply.status(404).send('Task not found');
    }
    return { total_time: existingTask.total_time };
  } catch (error) {
    handleServerError(error, reply);
  }
}