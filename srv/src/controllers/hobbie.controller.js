import Hobbie from '../model/hobbie.model.js';
import { loginUser as User } from './user.controller.js';
import { handleZodError, handleServerError } from './task.controller.js';
import hobbieSchema from '../validators/hobbie.schema.js';
import logger from '../config/logger.js';

export async function addHobbie(request, reply){
    try {
        const validatedData = hobbieSchema.parse(request.body);
        const newHobbie = await Hobbie.create(validatedData, validatedData.id_user = User.id );
        reply.status(201).send(newHobbie);
    } catch (error) {
        logger.info(error);
        handleZodError(error, reply);
        handleServerError(error, reply);
    }
}

export async function typeHobbie(request, reply){
    try {
        const findHobbie = await Hobbie.findByPk(request.params.id_hobbie);
        if (!findHobbie){
            reply.status(404).send('hobbie does not exist');
        } else if (findHobbie.importance === 'essential'){

        }
    } catch (error) {
        
    }
}