import { cards as Cards, decks } from '../model/flashcard.model.js';
import cardSchema from '../validators/cards.schema.js';
import { z } from 'zod';

// Function to create new cards
export async function createCards(request, reply) {
    try {
        const { id_decks } = request.params; // Extracting the deck ID from request parameters

        // Validating the request body against the card schema
        const validatedData = cardSchema.parse(request.body);
        const { front, verse } = validatedData;

        // Creating a new card in the database
        const newCard = await Cards.create({ front, verse, id_decks: id_decks });
        reply.status(201).send(newCard); // Responding with the created card

        // Update the deck to include the new card
        await decks.update(
            { $push: { cards: newCard.id_cards } }, // Add the new card ID to the deck's card list
            { where: { id_decks: id_decks } } // Condition to find the correct deck
        );

    } catch (error) {
        // Handling validation errors from Zod
        if (error instanceof z.ZodError) {
            return reply.status(400).send({
                error: 'Validation failed with Zod',
                details: error.errors // Sending back validation error details
            });
        } else {
            // Logging internal errors and responding with a generic error message
            console.error('Error creating card', error);
            reply.status(500).send({
                error: 'Error creating card',
                message: error.message
            });
        }
    }
};

// Function to retrieve all created cards
export async function allCards(request, reply) {
    try {
        const cards = await Cards.findAll(); // Find all cards in the database
        reply.status(200).send(cards); // Responding with the list of cards
    } catch (error) {
        console.error(error);
        console.error(error.message); // Corrected spelling from 'mensage' to 'message'
        reply.status(500).send({ error: 'Error loading cards' }); // Handling errors
    }
};

// Function to get all cards for a specific deck
export async function getCards(request, reply) {
    try {
        const { id_decks } = request.params; // Extracting the deck ID from request parameters

        // Finding cards belonging to the specified deck and only returning 'front' and 'verse' attributes
        const cards = await Cards.findAll({
            where: { id_decks: id_decks },
            attributes: ['id_cards', 'verse', 'front']
        });
        
        reply.status(200).send(cards); // Responding with the found cards
    } catch (error) {
        console.error(error);
        console.error(error.message);
        reply.status(500).send({ error: 'Error loading the card' }); // Handling errors
    }
};

// Function to delete a card by ID
export async function deleteCards(request, reply) {
    try {
        const { id } = request.params; // Extracting the card ID from request parameters
        const deleteCard = await Cards.findById(id); // Finding the card by ID

        // If the card is not found, respond with an error message
        if (!deleteCard) {
            return reply.status(400).send({ message: 'Card not found' });
        } else {
            await deleteCard.destroy(); // Deleting the card
            return reply.status(200).send({ message: 'Card deleted successfully' }); // Responding with success message
        }

    } catch (error) {
        console.error(error); // Logging the error
        reply.status(500).send({
            message: 'Error deleting the card' // Handling errors
        });
    }
}
