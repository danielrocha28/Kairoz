
import Task from '../model/task.model.js';
import { handleServerError } from './task.controller.js';
import { getUserByID } from './user.controller.js';

export async function saveTotalTime(request, reply) {
  const token = (request.headers.authorization?.split(' ') ?? [])[1];
  const user = await getUserByID(token);
  if (!user) {
    reply.code(401).send('token not found or access not permitted');
  }
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
  const token = (request.headers.authorization?.split(' ') ?? [])[1];
  const user = await getUserByID(token);
  if (!user) {
    reply.code(401).send('token not found or access not permitted');
  }
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
