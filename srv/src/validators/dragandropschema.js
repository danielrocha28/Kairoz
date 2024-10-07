import { z } from 'zod';

const dragDropSchema = z.object({
  sourceIndex: z.number().min(0, { message: "sourceIndex must be a non-negative integer" }),
  targetIndex: z.number().min(0, { message: "targetIndex must be a non-negative integer" }),
});

export default dragdropschema;