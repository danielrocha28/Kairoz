import flashcard from '../model/cards.model.js'
import cardSchema from '../validators/cards.schema.js'
import {z} from 'zod';


//cria novas cartas
  export async function createCards(req, reply) {
    try {
      const validatedData = cardSchema.parse(req.body);
      const { front, verse} = validatedData;
  
            const newCards = await flashcard.create({front,verse});
            reply.status(201).send(newCards);
            

       }catch(error) {

        //relata erro de validaçao com o zod
            if(error instanceof z.ZodError) {

                return reply.status(400).send({
                    error: 'Falha na validação com o zod',
                    details:error.errors
                });

            }else{
        //relata erro interno
                console.error('Erro ao criar carta', error);

                reply.status(500).send({
                    error: 'Erro ao criar carta',
                    message: error.message
            });
    
         }
    }
 };

 //funçao para verificar todas as cartas criadas
 export async function allCards() {
    try {
        const cards = await flashcard.findAll(); // Encontre todas as cartas
        reply.status(200).send(cards);
    } catch (error) {
        reply.status(500).send({ error: 'Erro ao carregar cartas' });
    }
};

//funçao para verificar conteudo de carta especifica
export async function idCards(){
    try{
        const {id} = request.params;
        const cartaId = await flashcard.findById(id);
    
        if(!cartaId){
            return reply.status(404).send({ error: ' carta não encontradas' });
        }else{
        request.send({front: cartaId.frente, verse: cartaId.verso});
        }
    }catch (error){
       console.error(error);
       return reply.status(404).send({ message: ' Erro ao encontrar carta' });    
    }
}

export async function deleteCards(){
    try{
    const {id} = request.params;
    const deletecards = await flashcard.findById(id);

    
    if(!deletecards){
        return reply.status(400).send({ message: 'Carta não encontrada'});
    }else{
        await deletecards.destroy();

        return reply.status(200).send({ message: 'Carta deletada com sucesso' });
    }

    }catch (error){
        console.error(error);
        
        request.status(500).send({
             message: 'Erro ao deletar a carta'});

    }
}
