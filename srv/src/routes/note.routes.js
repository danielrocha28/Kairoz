import {createNote, getNote, allNote, updateNote, deleteNote} from '../controllers/note.controller.js';

const noteRoutes = (fastify, options, done) => {


    fastify.post('/note', async (request, reply) => {
        try {
          await createNote(request, reply);
        } catch (error) {
          reply.status(500).send({ error: 'Error processing the request' });
        }
      })
    

    fastify.get('/note/:id_note', async (request, reply) => {
        try {
          await getNote(request, reply);
        } catch (error) {
          reply.status(500).send({ error: 'Error processing the request' });
        }
      });


      fastify.get('/note/all', async (request, reply) => {
        try {
          await allNote(request, reply);
        } catch (error) {
          reply.status(500).send({ error: 'Error processing the request' });
        }
      });

      fastify.put('/note/:id_note', async (request, reply) => {
        try {
          await updateNote(request, reply);
        } catch (error) {
          reply.status(500).send({ error: 'Error processing the request' });
        }
      });

      fastify.delete('/note/:id_note', async (request, reply) => {
        try {
          await deleteNote(request, reply);
        } catch (error) {
          reply.status(500).send({ error: 'Error processing the request' });
        }
      });


    done();
    };

    export default noteRoutes;