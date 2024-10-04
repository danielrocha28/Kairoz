import fastify from 'fastify';
import {createCards, getCards, deleteCards} from '../controllers/cards.controllers.js';
import { createDecks,getDecks, deleteDecks } from '../controllers/decks.controllers.js';


const flashcardRoutes = (fastify, options, done) => {

fastify.post('/decks/:id_decks/cards',  async (request, reply) => {
    try{

      await createCards(request, reply);
    }catch (error){
      console.error(error);
      reply.status(500).send({error: 'Erro ao processar a requisiçao'});
  }
  });

  fastify.get('/cards/:id', async (request, reply) => {
        try{
          const {id_decks, name} = request.params;


          await getCards(request, reply);
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
    console.error('Erro ao processar a requisição:', error); // Imprime o erro completo
    console.error('Mensagem do erro:', error.message); // Mensagem de erro
    if (error.stack) {
        console.error('Stack Trace:', error.stack);}
    {
    reply.status(500).send({error: 'Erro ao processar a requisiçao'})
    console.error(error.mensagem);
  }
}});



fastify.get('/decks/:id', async (request, reply) => {
  try{
    await getDecks(request,reply);

  }catch(error) {console.error('Erro ao processar a requisição:', error); // Imprime o erro completo
    console.error('Mensagem do erro:', error.message); // Mensagem de erro
    if (error.stack) {
        console.error('Stack Trace:', error.stack);}
    {
    reply.status(500).send({error: 'Erro ao processar a requisiçao'})
    console.error(error.mensagem);
  }
}});


fastify.delete('/decks/:id', async (request, reply) => {
  try{
    await deleteDecks(request,reply);

  }catch(error) {
    reply.status(500).send({error: 'Erro ao processar a requisiçao'})
  }
})



done();
};


export default flashcardRoutes;



