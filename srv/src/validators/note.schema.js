import {z} from 'zod';

export const noteSchema = z.object({
    title: z.string('title').min(1, 'Digite o titulo'),
    description: z.string().optional()
});

export default noteSchema;