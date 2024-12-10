import { z } from 'zod';

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  tag: z.enum(['task']),
  total_time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,
  'The field must be in the format HH:MM:SS').optional(),
  description: z.string().optional(),
  parentId: z.number().int().nullable().optional(), 
  repeat: z.enum(['daily', 'weekly', 'monthly', 'yearly', 'none']).optional(),
  category: z.enum(['study', 'work', 'health', 'leisure']),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  status: z.enum(['pending', 'in-progress', 'completed']).optional(),
  dueDate: z.coerce.date().optional(),
  reminder: z.coerce.date().optional(),
  notes: z.string().optional(),
  id_user: z.number().int().optional()
}).strict();

const studyTopicSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  tag: z.enum(['study topic']),
  category: z.enum(['study']),
  total_time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,
  'The field must be in the format HH:MM:SS').optional(),
  id_user: z.number().int().optional()
}).strict();

export { taskSchema, studyTopicSchema };