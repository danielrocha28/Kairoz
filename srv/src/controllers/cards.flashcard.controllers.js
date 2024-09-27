import {z} from 'zod';
import Cards from '../model/cards.model'


const cartaSchema = z.object({
    frente: z.string().min(1, 'Digite algo na Frente da carta'),
    verso: z.string().min(1, 'Digite algo no verso da carta'),
  });

//cria novas cartas
  export async function createCards(req, reply) {
    try {
      const validatedData = cartaSchema.parse(req.body);
      const { front, verse} = validatedData;
  
            const newCards = await Cards.create({front,verse});
            reply.status(201).json(newCards);
            

       }catch(error) {

        //relata erro de validaçao com o zod
            if(error instanceof z.ZodError) {

                return reply.status(400).json({
                    error: 'Falha na validação com o zod',
                    details:error.errors
                });

            }else{
        //relata erro interno
                console.error('Erro ao criar carta', error);

                reply.status(500).json({
                    error: 'Erro ao criar carta',
                    message: error.message
            });
    
         }
    }
 };

 //funçao para verificar todas as cartas criadas
 export async function allCards() {
    try {
        const cards = await Cards.findAll(); // Encontre todas as cartas
        reply.status(200).json(cards);
    } catch (error) {
        reply.status(500).json({ error: 'Erro ao carregar cartas' });
    }
};

//funçao para verificar conteudo de carta especifica
export async function idCards(){
    try{
        const {id} = request.params;
        const cartaId = await Cards.findById(id);
    
        if(!cartaId){
            return reply.status(404).json({ error: ' carta não encontradas' });
        }else{
        res.json({front: cartaId.frente, verse: cartaId.verso});
        }
    }catch (error){
       console.error(error);
       return reply.status(404).json({ message: ' Erro ao encontrar carta' });    
    }
}

export async function deleteCards(){
    try{
    const {id} = request.params;
    const deletecards = await Cards.findById(id);

    
    if(!deletecards){
        return reply.status(400).json({ message: 'Carta não encontrada'});
    }else{
        await deletecards.destroy();

        return reply.status(200).json({ message: 'Carta deletada com sucesso' });
    }

    }catch (error){
        console.error(error);
        
        request.status(500).json({
             message: 'Erro ao deletar a carta'});

    }
}
