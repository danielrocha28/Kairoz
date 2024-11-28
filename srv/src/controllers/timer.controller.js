import Task from '../model/task.model.js';
import { loginUser as user } from './user.controller.js';
import { handleServerError } from './task.controller.js';

export async function saveTotalTime(request, reply) {
  try {
    const totalTime = await Task.update(request.body.total_time, { 
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
    reply.status(200).send(existingTask.total_time);
  } catch (error) {
    handleServerError(error, reply);
  }
}