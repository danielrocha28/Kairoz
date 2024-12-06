import logger from '../config/logger.js';
import { getUserByID } from '../controllers/user.controller.js';
import sleepLogSchema from '../validators/sleep.log.schema.js';
import SleepTime from '../model/sleep.log.model.js';

const sleepLogRouters = (fastify, options, done) => {

    fastify.post('/sleep-time', async (request, reply) => {
        const token = (request.headers.authorization?.split(' ') ?? [])[1];
        const user = await getUserByID(token);
        const existSleep = await SleepTime.findAll({ where: { id_user: user.id }});
        if (existSleep){
            throw new Error('Existing registration just update');
        }
        try {
           const validatedData = sleepLogSchema.parse(request.body);
           const newSleepTime = await SleepTime.create(validatedData, { id_user: user.id });
           reply.status(201).send(newSleepTime);
        } catch (error) {
            logger.error(error);
            reply.status(500).send({ error: 'Error processing request', details: error.message });
        }
    });

    fastify.get('/sleep-time', async (request, reply) => {
        const token = (request.headers.authorization?.split(' ') ?? [])[1];
        const user = await getUserByID(token);
        try {
            const findSleepTime = await SleepTime.findOne({ where: { id_user: user.id }});
            if (!findSleepTime) {
                reply.status(404).send('No sleep log found');
            }
            reply.status(200).send(findSleepTime);
        } catch (error) {
            logger.error(error);
            reply.status(500).send({ error: 'Error processing request', details: error.message });
        }
    });

    fastify.put('/sleep-time', async (request, reply) => {
        const token = (request.headers.authorization?.split(' ') ?? [])[1];
        const user = await getUserByID(token);
        try {
            const sleepExists = await SleepTime.findAll({ where: { id_user: user.id }});
            if (!sleepExists){
                reply.status(404).send('There is no sleep record');
            }
            const validatedData = sleepLogSchema.parse(request.body);
            const sleepUpdated = await SleepTime.update(validatedData, { where: { id_user: user.id }});
            if (sleepUpdated){
                reply.status(200).send(sleepUpdated);
            } else {
                reply.code(404).send({ error: 'Sleep time with not found' });
            }
        } catch (error) {
            logger.error(error);
            reply.status(500).send({ error: 'Error processing request', details: error.message });
        }
    });

    done();
};

export default sleepLogRouters;