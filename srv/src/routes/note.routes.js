import {createNote, getNote, allNote, updateNote, deleteNote} from '../controllers/note.controller.js';
import logger from '../config/logger.js';

const noteRoutes = (fastify, options, done) => {


    fastify.post('/note', async (request, reply) => {
        try {
          await createNote(request, reply);
        } catch (error) {
          logger.error(error);
            reply.status(500).send({ error: 'Error processing request', details: error.message });
        }
      })
    

    fastify.get('/note/:id_note', async (request, reply) => {
        try {
          await getNote(request, reply);
        } catch (error) {
          logger.error(error);
            reply.status(500).send({ error: 'Error processing request', details: error.message });
        }
      });


      fastify.get('/note/all', async (request, reply) => {
        try {
          await allNote(request, reply);
        } catch (error) {
          logger.error(error);
          reply.status(500).send({ error: 'Error processing request', details: error.message });
        }
      });

      fastify.put('/note/:id_note', async (request, reply) => {
        try {
          await updateNote(request, reply);
        } catch (error) {
          logger.error(error);
          reply.status(500).send({ error: 'Error processing request', details: error.message });
        }
      });

      fastify.delete('/note/:id_note', async (request, reply) => {
        try {
          await deleteNote(request, reply);
        } catch (error) {
          logger.error(error);
          reply.status(500).send({ error: 'Error processing request', details: error.message });
        }
      });


    done();
    };

    export default noteRoutes;