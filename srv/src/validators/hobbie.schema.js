import { z } from 'zod';

const hobbieSchema = z.object({
    importance: z.enum(['essential', 'for leisure']),
    description: z.string().min(5),
    id_user: z.number().int(),
});

export default hobbieSchema;