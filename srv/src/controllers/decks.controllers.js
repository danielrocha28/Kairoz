import Decks from '../model/decks.model.js';
import deckSchema from '../validators/decks.schema.js';
import { z } from 'zod';
import logger from '../config/logger.js'; 

export async function createDecks(request, reply) {
    try {
        
        const validatedData = deckSchema.parse(request.body);
        const { name, description } = validatedData;

        const newDecks = await Decks.create({ name, description });
        reply.status(201).send(newDecks); 

    } catch (error) {
        if (error instanceof z.ZodError) {
            return reply.status(400).send({
                error: 'Validation failed with Zod',
                details: error.errors 
            });
        } else {
            
            logger.error('Error creating decks', error);
            reply.status(500).send({
                error: 'Error creating decks',
                message: error.message
            });
        }
    }
};

export async function allDecks(request, reply) {
    try {
      const decksList = await Decks.findAll(); 
      reply.status(200).send(decksList); 
    } catch (error) {
      logger.error('Error loading decks:', error); // Loga a mensagem de erro
      reply.status(500).send({ error: 'Error loading decks' }); 
    }
  };
  
export async function deleteDecks(request, reply) {
    try {
        const { id_decks } = request.params;// Extracting the deck ID from request parameters
        
        const deleteDecks = await Decks.findByPk(id_decks); 

        // If deck is not found, respond with an error message
        if (!deleteDecks) {
            return reply.status(400).send({ message: 'Deck not found' });
        } else {
            await deleteDecks.destroy(); // Deleting the deck
            return reply.status(200).send({ message: 'Deck deleted successfully' }); 
        }

    } catch (error) {
        logger.error(error); 
        reply.status(500).send({
            message: 'Error deleting the deck' 
        });
    }
}
