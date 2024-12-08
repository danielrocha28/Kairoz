import Task from '../model/task.model.js';
import { taskSchema, studyTopicSchema } from '../validators/task.schema.js';
import { z } from 'zod'; 
import { getUserByID } from './user.controller.js';

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
  const token = (request.headers.authorization?.split(' ') ?? [])[1];
  const user = await getUserByID(token);

  if (!user) {
    reply.code(401).send('token not found or access not permitted');
  }
  
  try {
    let validatedData = taskSchema.parse(request.body);
    const existsTask = await Task.findOne({ where: { title: validatedData.title }});
    if (existsTask) {
      throw new Error('Task with this title already existing');
    }

    if (validatedData.tag === 'task'){
      const newTask = await Task.create({ ...validatedData, id_user: user.id });
      reply.code(201).send(newTask); 
    } else {
      validatedData = studyTopicSchema.parse(request.body);
      const newStudyTopic = await Task.create({ ...validatedData, id_user: user.id });
      reply.code(201).send(newStudyTopic);
    }
  } catch (error) {
    handleZodError(error, reply);
    handleServerError(error, reply);
  }
}

export async function getTasks(request, reply) {
  const token = (request.headers.authorization?.split(' ') ?? [])[1];
  const user = await getUserByID(token);
  if (!user) {
    reply.code(401).send('token not found or access not permitted');
  }
  try {
    const tasks = await Task.findAll({ where:{ tag: 'task'}});
    reply.code(200).send(tasks);
  } catch (error) {
    handleZodError(error, reply);
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
    const studyTopic = await Task.findAll({ where:{ tag: 'study topic' }});
      if (!studyTopic){
        reply.code(404).send('There are no study topics');
      }
      reply.code(200).send(studyTopic);
  } catch (error) {
    handleZodError(error, reply);
    handleServerError(error, reply);
  }
}

export async function getList(request, reply) {
  try {
    const tasks = await Task.findAll();
    if (!tasks) {
      reply.code(404).send('tasks not found');
    }
    return { id: tasks.id, title: tasks.title, total_time: tasks.total_time };
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
    const deleted = await Task.destroy({ where: { id_task: request.params.id } }); 

    if (deleted) {
      return reply.code(200).send({ message: `Task with id_task ${request.params.id} deleted` });
    } 
    
    return reply.code(404).send({ error: `Task with id_task ${request.params.id} not found` });    
  } catch (error) {
    handleZodError(error, reply);
    handleServerError(error, reply);
  }
}