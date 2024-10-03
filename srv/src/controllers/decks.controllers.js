import decks from '../model/flashcard.model.js'


export async function createDecks(request, reply){
    try{
        const validatedData = decksSchema.parse(request.body);
        const {name, description} = validatedData;

        const newDecks =  await decks.create({name, description});
        reply.status(201).send(newDecks);


        }catch(error){

            
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



export async function allDecks() {
    try {
        const cards = await decks.findAll(); // Encontre todas as cartas
        reply.status(200).send(cards);
    } catch (error) {
        reply.status(500).send({ error: 'Erro ao carregar cartas' });
    }
};




export async function deleteDecks(){
    try{
    const {id} = request.params;
    const deletedecks = await decks.findById(id);

    
    if(!deletecards){
        return reply.status(400).send({ message: 'Carta não encontrada'});
    }else{
        await deletedecks.destroy();

        return reply.status(200).send({ message: 'Carta deletada com sucesso' });
    }

    }catch (error){
        console.error(error);
        
        request.status(500).send({
             message: 'Erro ao deletar a carta'});

    }
}


        
    
