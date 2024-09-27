import {createCards, getCards, cardsId} from '../controllers/cards.flashcard.controllers';

fastify.post('/cards/create',  async (request, reply) => {
    try{
      await createCards(request, reply);
    }catch (error){
      reply.status(500).send({error: 'Erro ao processar a requisiçao'});
  }
  });

  fastify.get('/cards/allcards', async (request, reply) => {
        try{
          await allCards(request, reply);
        }catch (error){
          reply.status(500).send({error: 'Erro ao processar a requisiçao'});
      }
      });

   fastify.get('/cards/:id', async (request, reply) => {
    try{
      await cardsId(request, reply);
    }catch (error){
      reply.status(500).send({error: 'Erro ao processar a requisiçao'});
  }
  });

  fastify.delete('/cards/:id/delete', async (request, reply) => {
    try{
      await deleteCards(request, reply);
    }catch (error){
      reply.status(500).send({error: 'Erro ao processar a requisiçao'});
  }
  });

  



