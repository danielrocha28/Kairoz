import { z } from 'zod';

const alarmSchema = z.object({
  alarm_time: z.string().regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/),
  alarm_day: z.array(z.enum(['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'none'])).optional(),
  message: z.string().optional(),
  executed: z.boolean().optional(),
  id_user: z.number().int().nullable(),
}).strict();

export default alarmSchema;