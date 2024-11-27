import Task from '../model/task.model.js';
import taskSchema from '../validators/task.schema.js';
import { z } from 'zod'; 
import { loginUser as user } from './user.controller.js';

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
    if (validatedData.tag === 'task'){
      const newTask = await Task.create(validatedData);
      reply.code(201).send(newTask); 
    } else {
      const newStudyTopic = await Task.create(validatedData);
      reply.code(201).send(newStudyTopic);
    }
  } catch (error) {
    handleZodError(error, reply);
    handleServerError(error, reply);
  }
}

export async function getTasks(request, reply) {
  try {
    const tasks = await Task.findAll({ where:{ id_user: user.id }});
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
    handleZodError(error, reply);
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
    handleServerError(error, reply);
  }
}

export async function getStudyTopic(request, reply) {
  try {
    const studyTopic = await Task.findAll({ tag: 'study topic', 
      where: { id_user: user.id }});
      if (!studyTopic){
        reply.code(404).send('There are no study topics');
      }
      reply.code(200).send(studyTopic);
  } catch (error) {
    handleZodError(error, reply);
    handleServerError(error, reply);
  }
}

export async function getListId(request, reply) {
  try {
    const tasksId = await Task.findAll({
      attributes: ['id', 'title'], 
    });
    reply.code(200).send(tasksId);
  } catch (error) {
    handleZodError(error, reply);
    handleServerError(error, reply);
  }
}

export async function IdTopicOrTask(request, reply) {
  try {
    const task = await Task.findOne(request.body.title);
    if (!task){
      reply.code(404).send('task or topic not found');
    }
    reply.code(200).send(task.id);
  } catch (error) {
    handleZodError(error, reply);
    handleServerError(error, reply);
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
    handleZodError(error, reply);
    handleServerError(error, reply);
  }
}

