import Note from '../model/note.model.js';
import WebSocket from '../websocket_client/ws.note.controller.js';
import noteSchema from '../validators/note.schema.js';
import {z} from 'zod';

export async function createNote(request, reply){
    try{
    const validatedData = noteSchema.parse(request.body);
    const newNote =  await Note.create({title, description, date});

   
    await reply.status(201).send({
        message: 'Note create successfully',
        newNote,

        })
    }catch(error) {
        console.error(error);
        return reply.status(500).send({error: 'Error creating note', message: error.message});
    }
}

export async function getNote(request, reply) {
    try{
        const {id_note} = request.params;

    const note = await Note.Note.findByPk({id_note});
    reply.status(201).send(note);


}catch(error){
    console.error(error);
    console.error(error.message);
    reply.status(500).send({error: 'Error loading the note'});

}};

export async function allNote(request, reply) {
    try{
        const note = await Note.findAll();
        reply.status(201).send(note);
    }catch(error) {
        console.error(error);
        console.error(error.message);
        reply.status(500).send({error: 'Error loading the note'});
    }
};

export async function updateNote(request, reply) {
    try{
        const {id_note} = request.params;
        const {content} = request.body;

        const note = await Note.findByPk(id_note);
        if(!note){
            return reply.status(404).send({message: 'note not found'});
        }

        note.content = content;
        await note.save();


        Active.ws.send(JSON.stringify({
            action: 'update',
            note:{
                id: note.id,
                content: note.content
            }        
        }));
        
        return reply.status(200).send({message: 'success for update'});
    
    }catch(error) {
        console.error(error);
        return reply.status(500).send({message: 'Error updating'});
    }
}

export async function deleteNote(request, reply) {
    try{
        const {id_note} = request.params;
        const deleteNote = await Note.findByPk(id_note);

        if(!deleteNote) {
            return reply.status(400).send({message: 'Note not found'});
        }else{
            await deleteNote.destroy();
            return reply.status(200).send({message: 'Note deleted successfully'});
        }

    }catch(error){
        console.error(error);
        reply.status(500).send({message: 'Error deleting the note'});
    }
}