import fastify from 'fastify';
import {createCards, allCards, idCards, deleteCards} from '../controllers/cards.controllers.js';
import { createDecks, deleteDecks } from '../controllers/decks.controllers.js';


const flashcard = (fastify, options, done) => {

fastify.post('/cards/create',  async (request, reply) => {
    try{
    const {id_decks, name} = request.params;

      await createCards(request, reply);
    }catch (error){
      console.error(error);
      reply.status(500).send({error: 'Erro ao processar a requisiçao'});
  }
  });

  fastify.get('/cards/:id', async (request, reply) => {
        try{
          const {id_decks, name} = request.params;


          await allCards(request, reply);
        }catch (error){
          reply.status(500).send({error: 'Erro ao processar a requisiçao'});
      }
      });

   fastify.get('/cards/:id', async (request, reply) => {
    try{
      const {id_decks, name} = request.params;


      await idCards(request, reply);
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

 

fastify.post('/decks', async (request, reply) => {
  try{
    await createDecks(request,reply);

  }catch(error) {
    reply.status(500).send({error: 'Erro ao processar a requisiçao'})
  }
})

fastify.post('/decks/:id', async (request, reply) => {
  try{
    await allDecks(request,reply);

  }catch(error) {
    reply.status(500).send({error: 'Erro ao processar a requisiçao'})
  }
})

fastify.post('/decks/:id', async (request, reply) => {
  try{
    await deleteDecks(request,reply);

  }catch(error) {
    reply.status(500).send({error: 'Erro ao processar a requisiçao'})
  }
})



done();
};


export default flashcard;



