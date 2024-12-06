import { z } from 'zod';

const sleepLogSchema = z.object({
    sleep_time: z.string().regex(/^\d{2}:\d{2}$/, {
        message: 'O formato deve ser "00:00", com dois dígitos para horas e dois para minutos.',
      }),
    wake_up_time: z.string().regex(/^\d{2}:\d{2}$/, {
        message: 'O formato deve ser "00:00", com dois dígitos para horas e dois para minutos.',
      }),
});

export default sleepLogSchema;