import { z } from 'zod';

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  parentId: z.number().int().nullable().optional(), 
  repeat: z.enum(['daily', 'weekly', 'monthly', 'yearly', 'none']).optional(),
  category: z.enum(['study', 'work', 'health', 'leisure']),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  status: z.enum(['pending', 'in-progress', 'completed']).optional(),
  dueDate: z.coerce.date().optional(),
  reminder: z.coerce.date().optional(),
  notes: z.string().optional()
}).strict();

export default taskSchema;
