import fastify from 'fastify';
import { createCards, getCards, allCards, deleteCards } from '../controllers/cards.controllers.js';
import { createDecks, getDecks, deleteDecks } from '../controllers/decks.controllers.js';

// Define the flashcard routes
const flashcardRoutes = (fastify, options, done) => {
  
  // Route to create new cards
  fastify.post('/cards/:id_decks', async (request, reply) => {
    try {
      await createCards(request, reply); // Delegate to the createCards controller
    } catch (error) {
      console.error(error); // Log the error for debugging
      reply.status(500).send({ error: 'Error processing the request' }); // Send error response
    }
  });

  // Route to get all cards
  fastify.get('/cards/all', async (request, reply) => {
    try {
      await allCards(request, reply); // Delegate to the allCards controller
    } catch (error) {
      reply.status(500).send({ error: 'Error processing the request' }); // Send error response
    }
  });

  // Route to get all cards for a specific deck
  fastify.get('/cards/:id_decks/all', async (request, reply) => {
    try {
      await getCards(request, reply); // Delegate to the getCards controller
    } catch (error) {
      reply.status(500).send({ error: 'Error processing the request' }); // Send error response
    }
  });

  // Route to delete a card by ID
  fastify.delete('/cards/:id/delete', async (request, reply) => {
    try {
      await deleteCards(request, reply); // Delegate to the deleteCards controller
    } catch (error) {
      reply.status(500).send({ error: 'Error processing the request' }); // Send error response
    }
  });

  // Route to create new decks
  fastify.post('/decks', async (request, reply) => {
    try {
      await createDecks(request, reply); // Delegate to the createDecks controller
    } catch (error) {
      console.error('Error processing the request:', error); // Log the error
      console.error('Error message:', error.message); // Log the error message
      if (error.stack) {
        console.error('Stack Trace:', error.stack); // Log stack trace if available
      }
      reply.status(500).send({ error: 'Error processing the request' }); // Send error response
    }
  });

  // Route to get a specific deck by ID
  fastify.get('/decks/:id', async (request, reply) => {
    try {
      await getDecks(request, reply); // Delegate to the getDecks controller
    } catch (error) {
      console.error('Error processing the request:', error); // Log the error
      console.error('Error message:', error.message); // Log the error message
      
      if (error.stack) {
        console.error('Stack Trace:', error.stack); // Log stack trace if available
      }
      reply.status(500).send({ error: 'Error processing the request' }); // Send error response
    }
  });

  // Route to delete a deck by ID
  fastify.delete('/decks/:id', async (request, reply) => {
    try {
      await deleteDecks(request, reply); // Delegate to the deleteDecks controller
    } catch (error) {
      reply.status(500).send({ error: 'Error processing the request' }); // Send error response
    }
  });

  // Signal that route registration is complete
  done();
};

export default flashcardRoutes; // Export the routes
