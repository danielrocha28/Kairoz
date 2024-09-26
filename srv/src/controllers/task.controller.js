import Task from '../model/task.model.js'; 
//import taskSchema from '../validators/task.schema.js';  
import { z } from 'zod';

export const createTask = async (req, res) => {
  try {
    const validatedData = taskSchema.parse(req.body);
    const newTask = await Task.create(validatedData);
    res.status(201).json(newTask);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const validatedData = taskSchema.parse(req.body);
    const [updated] = await Task.update(validatedData, { where: { id: req.params.id } });
    if (updated) {
      const updatedTask = await Task.findByPk(req.params.id);
      res.status(200).json(updatedTask);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deleted = await Task.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
