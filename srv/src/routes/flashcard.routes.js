import { createCards, getCards, allCards, deleteCards } from '../controllers/cards.controllers.js';
import { createDecks, allDecks, deleteDecks } from '../controllers/decks.controllers.js';
import logger from '../config/logger.js';

const flashcardRoutes = (fastify, options, done) => {

  fastify.post('/cards/:id_decks', async (request, reply) => {
    try {
      await createCards(request, reply);
    } catch (error) {
      logger.error('Error creating card:', error);
      reply.status(500).send({ error: 'Error processing the request' });
    }
  });

  fastify.get('/cards/all', async (request, reply) => {
    try {
      await allCards(request, reply);
    } catch (error) {
      logger.error('Error retrieving all cards:', error);
      reply.status(500).send({ error: 'Error processing the request' });
    }
  });

  fastify.get('/cards/:id_decks', async (request, reply) => {
    try { 
      await getCards(request, reply); 
    } catch (error) {
      logger.error('Error retrieving cards for deck:', error);
      reply.status(500).send({ error: 'Error processing the request' });
    }
  });

  fastify.delete('/cards/:id', async (request, reply) => {
    try {
      await deleteCards(request, reply);
    } catch (error) {
      logger.error('Error deleting card:', error);
      reply.status(500).send({ error: 'Error processing the request' });
    }
  });

  // Routes for decks
  fastify.post('/decks', async (request, reply) => {
    try {
      await createDecks(request, reply);
    } catch (error) {
      logger.error('Error creating deck:', error);
      reply.status(500).send({ error: 'Error processing the request' });
    }
  });

  fastify.get('/decks/:id', async (request, reply) => {
    try {
      await allDecks(request, reply);
    } catch (error) {
      logger.error('Error retrieving decks:', error);
      reply.status(500).send({ error: 'Error processing the request' });
    }
  });

  fastify.delete('/decks/:id', async (request, reply) => {
    try {
      await deleteDecks(request, reply);
    } catch (error) {
      logger.error('Error deleting deck:', error);
      reply.status(500).send({ error: 'Error processing the request' });
    }
  });

  done();
};

export default flashcardRoutes;
