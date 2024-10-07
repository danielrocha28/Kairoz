import decks from '../model/flashcard.model.js';
import deckSchema from '../validators/decks.schema.js';
import { z } from 'zod';

console.log(deckSchema); // Log the deck schema for debugging purposes

// Function to create new decks
export async function createDecks(request, reply) {
    try {
        // Validating the request body against the deck schema
        const validatedData = deckSchema.parse(request.body);
        const { name, description } = validatedData;

        // Creating a new deck in the database
        const newDecks = await decks.create({ name, description });
        reply.status(201).send(newDecks); 
        //Responding with the created deck

    } catch (error) {
        // Handling validation errors from Zod
        if (error instanceof z.ZodError) {
            return reply.status(400).send({
                error: 'Validation failed with Zod',
                details: error.errors // Sending back validation error details
            });
        } else {
            // Logging internal errors and responding with a generic error message
            console.error('Error creating decks', error);
            reply.status(500).send({
                error: 'Error creating decks',
                message: error.message
            });
        }
    }
};

// Function to retrieve all decks
export async function getDecks(request, reply) {
    try {
        const decksList = await decks.findAll(); // Find all decks in the database
        reply.status(200).send(decksList); // Responding with the list of decks
    } catch (error) {
        reply.status(500).send({ error: 'Error loading decks' }); // Handling errors
    }
};

// Function to delete a deck by ID
export async function deleteDecks(request, reply) {
    try {
        const { id } = request.params;// Extracting the deck ID from request parameters
        
        const deleteDecks = await decks.findByPk(id); // Finding the deck by ID

        // If deck is not found, respond with an error message
        if (!deleteDecks) {
            return reply.status(400).send({ message: 'Deck not found' });
        } else {
            await deleteDecks.destroy(); // Deleting the deck
            return reply.status(200).send({ message: 'Deck deleted successfully' }); // Responding with success message
        }

    } catch (error) {
        console.error(error); // Logging the error
        reply.status(500).send({
            message: 'Error deleting the deck' // Handling errors
        });
    }
}
