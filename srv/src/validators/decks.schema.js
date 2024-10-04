import {z} from 'zod';


export  const deckSchema = z.object({
    name: z.string().min(1, 'Digite um nome para o deck'),
    description: z.string().optional()
  });


  export default deckSchema;