import { Album, Photo } from '../model/album-photo.model.js';
import logger from '../config/logger.js';
import { loginUser as User } from './user.controller.js';
import { albumSchema, photoSchema } from '../validators/album-photos.schema.js';

// crud who handles the albums
export async function createAlbum(request, reply) {
    try {
        const validatedData = albumSchema.parse(request.body);
        const newAlbum = await Album.create(validatedData, validatedData.id_user = User.id);
        reply.status(201).send(newAlbum);
    } catch (error) {
        logger.error('error creating album', error);
        reply.status(500).send({ error: error.message });
    }
}

export async function updateAlbum(request, reply) {
    try {
        const validatedData = albumSchema.parse(request.body);
        const [updated] = await Album.update(validatedData, { where: { id_album: request.params.id_album } }); 

        if (!updated) {
            reply.status(404).send({ error: `Album with id_album ${request.params.id_album} not found` });
        }

        const updatedAlbum = await Album.findByPk(request.params.id_album); 
        reply.status(200).send(updatedAlbum);
        
    } catch (error) {
        logger.error('error when updating album', error);
        reply.status(500).send({ error: error.message });
    }
}

export async function viewAlbums(request, reply){
    try {
        const albums = await Album.findAll({ where: { id_user: User.id }});
        if (!albums){
            reply.status('Albums does not exist');
        }
        reply.status(200).send(albums);
    } catch (error) {
        logger.error('error when viewing albums', error);
        reply.status(500).send({ error: error.message });
    }
}

export async function deleteAlbum(request, reply){
    try {
        const album = await Album.findByPk(request.params.id_album);

        if (!album){
            reply.status(404).send('Album not found');
        }

        const deleted = await Album.destroy({ id_album: album.id_album });
        if (deleted){
            reply.status(200).send('Album successfully deleted');
        }
        
    } catch (error) {
        logger.error('error when deleting album', error);
        reply.status(500).send({ error: error.message });    
    }
}

// crud who manipulates the photos
export async function addPhoto(request, reply){
    try {
        const validatedData = photoSchema.parse(request.body);
        const newPhoto = await Photo.create(validatedData);
        reply.status(201).send(newPhoto);
    } catch (error) {
        logger.error('error when adding photo', error);
        reply.status(500).send({ error: error.message });
    }
}

export async function addPhotoToAlbum(request, reply){
    try {
        const existingAlbum = await Album.findByPk(request.params.id_album);
        if (!existingAlbum){
            reply.status(404).send('Album not found');
        }

        const addingPhoto = Photo.update({ id_album: existingAlbum.id_album });
        reply.status(200).send(addingPhoto);
    } catch (error) {
        logger.error(`error when adding photo to album ${request.params.id_album}`, error);
        reply.status(500).send({ error: error.message });
    }
}

export async function viewPhotosToAlbum(request, reply){
    try {
        const albumId = await Album.findByPk(request.params.id_album);
        if (!albumId){
            reply.status(404).send('Album not found');
        }

        const photos = await Photo.findAll({ where: { id_album: albumId.id_album }});
        reply.status(200).send(photos);
    } catch (error){
        logger.error('error finding photos', error);
        reply.status(500).send({ error: error.message });
    }
}

export async function viewPhoto(request, reply){
    try {
        const existingPhoto = await Photo.findByPk(request.params.id_photo);
        if (!existingPhoto){
            reply.status(404).send('Photo does not exist');
        }

        reply.status(200).send(existingPhoto);
    } catch (error) {
        logger.error('error when viewing photo', error);
        reply.status(500).send({ error: error.message });
    }
}

export async function removePhoto(request, reply){
    try {
        let param = {};
        
        if (request.params.id_album){
            param = request.params.id_album;
        } else if (request.params.id_photo){
            param = request.params.id_photo;
        }

        const existingPhoto = await Photo.findOne({ where: param });
        if (!existingPhoto){
            reply.status(404).send('Photo does not exist');
        }

        const deleted = await Photo.destroy(existingPhoto.id_photo);
        if (deleted){
            reply.status(200).send('photo removed');
        }
    } catch (error) {
        logger.error('error when removing photo', error);
        reply.status(500).send({ error: error.message });
    }
}