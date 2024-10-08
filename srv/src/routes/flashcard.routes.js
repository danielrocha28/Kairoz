import fastify from 'fastify';
import { createCards, getCards, allCards, deleteCards } from '../controllers/cards.controllers.js';
import { createDecks, getDecks, deleteDecks } from '../controllers/decks.controllers.js';

const flashcardRoutes = (fastify, options, done) => {
  
  // Route to create new cards
  fastify.post('/cards/:id_decks', async (request, reply) => {
    try {
      await createCards(request, reply); 
    } catch (error) {
      console.error(error); 
      reply.status(500).send({ error: 'Error processing the request' }); 
    }
  });

  // Route to get all cards
  fastify.get('/cards/all', async (request, reply) => {
    try {
      await allCards(request, reply); 
    } catch (error) {
      reply.status(500).send({ error: 'Error processing the request' }); 
    }
  });

  // Route to get all cards for a specific deck
  fastify.get('/cards/:id_decks', async (request, reply) => {
    try {
      await getCards(request, reply); 
    } catch (error) {
      reply.status(500).send({ error: 'Error processing the request' }); 
    }
  });

  // Route to delete a card by ID
  fastify.delete('/cards/:id', async (request, reply) => {
    try {
      await deleteCards(request, reply); 
    } catch (error) {
      reply.status(500).send({ error: 'Error processing the request' }); 
    }
  });

  // Route to create new decks
  fastify.post('/decks', async (request, reply) => {
    try {
      await createDecks(request, reply); 
    } catch (error) {
      console.error('Error processing the request:', error); 
      console.error('Error message:', error.message); 
      if (error.stack) {
        console.error('Stack Trace:', error.stack); // Log stack trace if available
      }
      reply.status(500).send({ error: 'Error processing the request' }); 
    }
  });

  // Route to get a specific deck by ID
  fastify.get('/decks/:id', async (request, reply) => {
    try {
      await getDecks(request, reply); 
    } catch (error) {
      console.error('Error processing the request:', error); 
      console.error('Error message:', error.message); 
      
      if (error.stack) {
        console.error('Stack Trace:', error.stack); // Log stack trace if available
      }
      reply.status(500).send({ error: 'Error processing the request' }); 
    }
  });

  // Route to delete a deck by ID
  fastify.delete('/decks/:id', async (request, reply) => {
    try {
      await deleteDecks(request, reply); 
    } catch (error) {
      reply.status(500).send({ error: 'Error processing the request' }); 
    }
  });

  done();
};

export default flashcardRoutes; 
