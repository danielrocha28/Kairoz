import { z } from 'zod';

const albumSchema = z.object({
  name_album: z.string().nullable(),
  legend_album: z.string().optional(),
  id_user: z.number().int().optional(),
}).strict();

const photoSchema = z.object({
  name_file: z.string().nullable(),
  URL: z.string().nullable().url(),
}).strict();

export { albumSchema, photoSchema };