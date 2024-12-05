import { createAlarm, usingAlarm, updateAlarm, deleteAlarm, getAlarmsAll } from '../controllers/alarm.controller.js';
import logger from '../config/logger.js';

const alarmRoutes = (fastify, options, done) => {

    fastify.post('/alarms', async (request, reply) => {
        try {
            await createAlarm(request, reply);
        } catch (error) {
            logger.error(error);
            reply.status(500).send({ error: 'Error processing request', details: error.message });
        }
    });

    fastify.put('/alarms/:id_alarm', async (request, reply) => {
        try {
            const alarmId = parseInt(request.params.id_alarm, 10);
            if (isNaN(alarmId)) {
                return reply.status(400).send({ error: 'Invalid alarm ID' });
            }
            const alarm = await updateAlarm(request, reply);
            // If activated, start the counting
            if (alarm.executed === true) {
                await usingAlarm(request, reply);
            }
            reply.status(200).send(alarm);
        } catch (error) {
            logger.error(error);
            reply.status(500).send({ error: 'Error processing request', details: error.message });
        }
    });

    fastify.delete('/alarms/:id_alarm', async (request, reply) => {
        try {
            const alarmId = parseInt(request.params.id_alarm, 10);
            if (isNaN(alarmId)) {
                return reply.status(400).send({ error: 'Invalid alarm ID' });
            }
            await deleteAlarm(request, reply);
        } catch (error) {
            logger.error(error);
            reply.status(500).send({ error: 'Error processing request', details: error.message });
        }
    });

    fastify.get('/alarms', async (request, reply) => {
        try {
            await getAlarmsAll(request,reply);
        } catch (error) {
            logger.error(error);
            reply.status(500).send({ error: 'Error processing request', details: error.message });
        }
    });

    done();
};

export default alarmRoutes;
