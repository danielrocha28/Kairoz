import logger from '../config/logger';
import { getUserByID } from '../controllers/user.controller';
import sleepLogSchema from '../validators/sleep.log.schema';
import SleepTime from '../model/sleep.log.model';

const sleepLogRouters = (fastify, options, done) => {

    fastify.post('sleep-time', async (request, reply) => {
        const token = (request.headers.authorization?.split(' ') ?? [])[1];
        const user = await getUserByID(token);
        try {
           const validatedData = sleepLogSchema.parse(request.body);
           const newSleepTime = await SleepTime.create(validatedData, { id_user: user.id });
           reply.status(201).send(newSleepTime);
        } catch (error) {
            logger.error(error);
            reply.status(500).send({ error: 'Error processing request', details: error.message });
        }
    });

    fastify.get('sleep_time', async (request, reply) => {
        const token = (request.headers.authorization?.split(' ') ?? [])[1];
        const user = await getUserByID(token);
        try {
            const findSleepTime = await SleepTime.findOne({ where: { id_user: user.id }});
            if (!findSleepTime) {
                reply.status(404).send('no sleep log found');
            }
            reply.status(200).send(findSleepTime);
        } catch (error) {
            logger.error(error);
            reply.status(500).send({ error: 'Error processing request', details: error.message });
        }
    });

    done();
};

export default sleepLogRouters;