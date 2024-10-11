import { cards as Cards} from '../model/cards.model.js';
import decks from '../model/decks.model.js';
import cardSchema from '../validators/cards.schema.js';
import { z } from 'zod';

export async function createCards(request, reply) {
    try {
        const { id_decks } = request.params; 

        const validatedData = cardSchema.parse(request.body);
        const { front, verse } = validatedData;

        const newCard = await Cards.create({ front, verse, id_decks: id_decks });
        reply.status(201).send(newCard); 

        // Update the deck to include the new card
        await decks.update(
            { $push: { cards: newCard.id_cards } }, // Add the new card ID to the deck's card list
            { where: { id_decks: id_decks } } // Condition to find the correct deck
        );

    } catch (error) {
        if (error instanceof z.ZodError) {
            return reply.status(400).send({
                error: 'Validation failed with Zod',
                details: error.errors 
            });
        } else {
            console.error('Error creating card', error);
            reply.status(500).send({
                error: 'Error creating card',
                message: error.message
            });
        }
    }
};

export async function allCards(request, reply) {
    try {
        const cards = await Cards.findAll(); 
        reply.status(200).send(cards); 
    } catch (error) {
        console.error(error);
        console.error(error.message); 
        reply.status(500).send({ error: 'Error loading cards' }); 
    }
};

export async function getCards(request, reply) {
    try {
        const { id_decks } = request.params; 

        const cards = await Cards.findAll({
            where: { id_decks: id_decks },
            attributes: ['id_cards', 'verse', 'front']
        });
        
        reply.status(200).send(cards); 
    } catch (error) {
        console.error(error);
        console.error(error.message);
        reply.status(500).send({ error: 'Error loading the card' }); 
    }
};

export async function deleteCards(request, reply) {
    try {
        const { id } = request.params; 
        const deleteCard = await Cards.findById(id); 

        if (!deleteCard) {
            return reply.status(400).send({ message: 'Card not found' });
        } else {
            await deleteCard.destroy(); 
            return reply.status(200).send({ message: 'Card deleted successfully' }); 
        }

    } catch (error) {
        console.error(error); 
        reply.status(500).send({
            message: 'Error deleting the card' 
        });
    }
}
