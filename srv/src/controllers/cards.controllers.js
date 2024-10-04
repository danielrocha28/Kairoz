import {decks, cards} from '../model/flashcard.model.js'
import cardSchema from '../validators/flashcard.schema.js'
import {z} from 'zod';



//cria novas cartas
  export async function createCards(request, reply) {
    try {
        const {id_decks} = request.params;


      const validatedData = cardSchema.parse(request.body);
      const { front, verse} = validatedData;
  
            const newCard = await cards.create({front,verse, id_decks: id_decks});
            reply.status(201).send(newCard);

            const deck = await decks.findByPk(id_decks);
            if(deck){
                await deck.addcards(newCard);
            }
            

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
 export async function getCards() {
    try {
        const cards = await cards.findAll({where: {id_decks: id_decks} }); // Encontre todas as cartas
        reply.status(200).send(cards);
    } catch (error) {
        reply.status(500).send({ error: 'Erro ao carregar cartas' });
    }
};



export async function deleteCards(){
    try{
    const {id} = request.params;
    const deletecards = await cards.findById(id);

    
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
