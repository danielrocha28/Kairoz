
import Task from '../model/task.model.js';
import { handleServerError } from './task.controller.js';
import { getUserByID } from './user.controller.js';

export async function saveTotalTime(request, reply) {
  const token = (request.headers.authorization?.split(' ') ?? [])[1];
  const user = await getUserByID(token);
  if (!user) {
    reply.code(401).send('token not found or access not permitted');
    return;
  }
  try {
    const { total_time, day_update, title } = request.body;
    const totalTime = await Task.update(
      { total_time, day_update }, 
      {
        where: { 
          title, 
          id_user: user.id,
          tag: 'study topic' 
        },
      }
    );
    if (totalTime) {
      reply.status(200).send(totalTime);
    } else {
      reply.status(404).send('Task not found for the given title and tag');
    }
  } catch (error) {
    handleServerError(error,reply);
}}
export async function getTotalTime(request, reply) {
  const token = (request.headers.authorization?.split(' ') ?? [])[1];
  const user = await getUserByID(token);
  if (!user) {
    reply.code(401).send('token not found or access not permitted');
    return;
  }
  try {
    const { title } = request.body;
    const existingTask = await Task.findOne({
      where: { 
        title,
        id_user: user.id,
        tag: 'study topic' 
      },
    });
    if (!existingTask) {
      reply.status(404).send('Task not found for the given title and tag');
      return;
    }
    reply.send({ total_time: existingTask.total_time });
  } catch (error) {
    handleServerError(error,reply);
}}