import task from '../model/task.model.js'; 
import taskSchema from '../validators/task.schema.js'; 
import dragDropSchema from '../validators/dragDrop.schema.js'; 
import { z } from 'zod';

const handleZodError = (error, reply) => {
  if (error instanceof z.ZodError) {
    reply.code(400).send({ errors: error.errors });
  } else {
    reply.code(500).send({ error: error.message });
  }
};

export async function createTask(request, reply) {
  try {
    const validatedData = taskSchema.parse(request.body);
    const newTask = await task.create(validatedData);
    reply.code(201).send(newTask);
  } catch (error) {
    handleZodError(error, reply);
  }
}

export async function getTasks(request, reply) {
  try {
    const tasks = await task.findAll();
    reply.code(200).send(tasks);
  } catch (error) {
    reply.code(500).send({ error: 'Internal server error' });
  }
}

export async function getTaskById(request, reply) {
  try {
    const taskData = await task.findByPk(request.params.id_task);
    if (taskData) {
      reply.code(200).send(taskData);
    } else {
      reply.code(404).send({ error: `Task with id_task ${request.params.id_task} not found` });
    }
  } catch (error) {
    reply.code(500).send({ error: 'Internal server error' });
  }
}

export async function updateTask(request, reply) {
  try {
    const validatedData = taskSchema.parse(request.body);
    const [updated] = await task.update(validatedData, { where: { id_task: request.params.id_task } });
    if (updated) {
      const updatedTask = await task.findByPk(request.params.id_task);
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
    const deleted = await task.destroy({ where: { id_task: request.params.id_task } });
    if (deleted) {
      reply.code(204).send();
    } else {
      reply.code(404).send({ error: `Task with id_task ${request.params.id_task} not found` });
    }
  } catch (error) {
    reply.code(500).send({ error: 'Internal server error' });
  }
}

export async function updateTaskOrder(request, reply) {
  try {
    const { sourceIndex, targetIndex } = dragDropSchema.parse(request.body);
    const tasks = await task.findAll({ order: [['order', 'ASC']] });

    if (sourceIndex >= tasks.length || targetIndex >= tasks.length) {
      return reply.status(400).send({ error: 'Indices are out of bounds' });
    }

    const [taskToMove] = tasks.splice(sourceIndex, 1);
    tasks.splice(targetIndex, 0, taskToMove);

    for (let i = 0; i < tasks.length; i++) {
      await tasks[i].update({ order: i });
    }

    reply.code(200).send({ message: 'Tasks reordered successfully' });
  } catch (error) {
    handleZodError(error, reply);
  }
}
