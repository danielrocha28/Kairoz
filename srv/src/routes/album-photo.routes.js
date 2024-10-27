import { createAlbum, updateAlbum, viewAlbums, deleteAlbum, addPhoto, 
addPhotoToAlbum, viewPhotosToAlbum, viewPhoto, removePhoto 
} from '../controllers/album-photo.controller';
import logger from '../config/logger';

const photoAlbumRouters = (fastify, options, done) => {
// Route to create an album
    fastify.post('/album', async (request, reply) => {
        try {
           await createAlbum(request, reply); 
        } catch (error) {
            logger.error(error);
            reply.status(500).send({ error: 'Error processing request', details: error.message });
        }
    });
// Route to update the album
    fastify.put('/album/:id_album', async (request, reply) => {
        try {
            await updateAlbum(request, reply);
        } catch (error) {
            logger.error(error);
            reply.status(500).send({ error: 'Error processing request', details: error.message });
        }
    });
// Route to view all albums
    fastify.get('/album', async (request, reply) => {
        try {
            await viewAlbums(request, reply);
        } catch (error) {
            logger.error(error);
            reply.status(500).send({ error: 'Error processing request', details: error.message });
        }
    });
// Route to delete the album
    fastify.delete('/album', async (request, reply) => {
        try {
            await deleteAlbum(request, reply);
        } catch (error) {
            logger.error(error);
            reply.status(500).send({ error: 'Error processing request', details: error.message });
        }
    });
// Route to add a photo
    fastify.post('/album-photo', async (request, reply) => {
        try {
            await addPhoto(request, reply);
        } catch (error) {
            logger.error(error);
            reply.status(500).send({ error: 'Error processing request', details: error.message });
        }
    });
// Route to add an existing photo to the album
    fastify.put('/album-photo/:id_album', async (request, reply) => {
        try {
            await addPhotoToAlbum(request, reply);
        } catch (error) {
            logger.error(error);
            reply.status(500).send({ error: 'Error processing request', details: error.message });
        }
    });
// Route to view all photos in the album
    fastify.get('/album-photo/:id_album', async (request, reply) => {
        try {
            await viewPhotosToAlbum(request, reply);
        } catch (error) {
            logger.error(error);
            reply.status(500).send({ error: 'Error processing request', details: error.message });
        }
    });
// Route to view a photo
    fastify.get('/album-photo/:id_photo', async (request, reply) => {
        try {
            await viewPhoto(request, reply);
        } catch (error) {
            logger.error(error);
            reply.status(500).send({ error: 'Error processing request', details: error.message });
        }
    });
// Route to delete a photo from the album
    fastify.delete('/album-photo/:id_album', async (request, reply) => {
        try {
            await removePhoto(request, reply);
        } catch (error) {
            logger.error(error);
            reply.status(500).send({ error: 'Error processing request', details: error.message });
        }
    });
// Route to delete a photo without an album
    fastify.delete('/album-photo/:id_photo', async (request, reply) => {
        try {
            await removePhoto(request, reply);
        } catch (error) {
            logger.error(error);
            reply.status(500).send({ error: 'Error processing request', details: error.message });
        }
    });

    done();
};

export default photoAlbumRouters;
