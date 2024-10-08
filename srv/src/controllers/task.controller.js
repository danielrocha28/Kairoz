import Task from '../model/task.model.js';
import taskSchema from '../validators/task.schema.js';
import { z } from 'zod'; 
import { loginUser } from './user.controller.js';

const handleZodError = (error, reply) => {
  if (error instanceof z.ZodError) {
    reply.code(400).send({ errors: error.errors });
  } else {
    reply.code(500).send({ error: error.message });
  }
};

export const handleServerError = (error, reply) => {
  reply.code(500).send({ error: error.message });
};

export async function createTask(request, reply) {
  try {
    const validatedData = taskSchema.parse(request.body);
    const newTask = await Task.create(validatedData);
    reply.code(201).send(newTask);
  } catch (error) {
    handleZodError(error, reply);
  }
}

export async function getTasks(request, reply) {
  try {
    const userData = loginUser(request,reply);
    const tasks = await Task.findAll({ where:{ id_user: userData.id_user }});
    reply.code(200).send(tasks);
  } catch (error) {
    handleServerError(error, reply);
  }
}

export async function getTaskById(request, reply) {
  try {
    const task = await Task.findByPk(request.params.id_task); 
    if (task) {
      reply.code(200).send(task);
    } else {
      reply.code(404).send({ error: `Task with id_task ${request.params.id_task} not found` });
    }
  } catch (error) {
    handleServerError(error, reply);
  }
}

export async function updateTask(request, reply) {
  try {
    const validatedData = taskSchema.parse(request.body);
    const [updated] = await Task.update(validatedData, { where: { id_task: request.params.id_task } }); 
    if (updated) {
      const updatedTask = await Task.findByPk(request.params.id_task); 
      reply.code(200).send(updatedTask);
    } else {
      reply.code(404).send({ error: `Task with id_task ${request.params.id_task} not found` });
    }
  } catch (error) {
    handleZodError(error, reply);
  }
}

export async function deleteTask(request, reply) {
  try {
    const deleted = await Task.destroy({ where: { id_task: request.params.id_task } }); 
    if (deleted) {
      reply.code(204).send();  
    } else {
      reply.code(404).send({ error: `Task with id_task ${request.params.id_task} not found` });
    }
  } catch (error) {
    handleServerError(error, reply);
  }
}

