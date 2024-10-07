import {z} from 'zod';


export const cardSchema = z.object({
    front: z.string().min(1, 'Digite algo na Frente da carta'),
    verse: z.string().min(1, 'Digite algo no verso da carta'),
  });

 


  export default cardSchema;