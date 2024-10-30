import Note from '../model/note.model.js';
import noteSchema from '../validators/note.schema.js';
import { z } from 'zod';
import logger from '../config/logger.js';

export async function createNote(request, reply) {
    try {
        const validatedData = noteSchema.parse(request.body);
        const { title, description } = validatedData;
        const date = new Date();

        const newNote = await Note.create({ title, description, date });

        reply.status(201).send({
            message: 'Note created successfully',
            newNote,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return reply.status(400).send({
                error: 'Validation failed with Zod',
                details: error.errors,
            });
        } else {
            logger.error(error);
            return reply.status(500).send({ error: 'Error creating note', message: error.message });
        }
    }
}

export async function getNote(request, reply) {
    try {
        const { id_note } = request.params;
        const note = await Note.findByPk(id_note);

        if (!note) {
            return reply.status(404).send({ error: 'Note not found' });
        }

        reply.status(200).send(note);
    } catch (error) {
        logger.error(error);
        reply.status(500).send({ error: 'Error loading the note' });
    }
}

export async function allNote(request, reply) {
    try {
        const notes = await Note.findAll();
        reply.status(200).send(notes);
    } catch (error) {
        logger.error(error);
        reply.status(500).send({ error: 'Error loading notes' });
    }
}

export async function updateNote(request, reply) {
    try {
        const { id_note } = request.params;
        const { description } = request.body;

        const note = await Note.findByPk(id_note);
        if (!note) {
            return reply.status(404).send({ message: 'Note not found' });
        }

        await Note.update({ description }, { where: { id_note } });
        const updatedNote = await Note.findByPk(id_note);
        reply.status(200).send({ message: 'Updated successfully', updatedNote });
    } catch (error) {
        logger.error(error);
        reply.status(500).send({ message: 'Error updating' });
    }
}

export async function deleteNote(request, reply) {
    try {
        const { id_note } = request.params;
        const noteToDelete = await Note.findByPk(id_note);

        if (!noteToDelete) {
            return reply.status(404).send({ message: 'Note not found' });
        } else {
            await noteToDelete.destroy();
            return reply.status(200).send({ message: 'Note deleted successfully' });
        }
    } catch (error) {
        logger.error(error);
        reply.status(500).send({ message: 'Error deleting the note' });
    }
}
