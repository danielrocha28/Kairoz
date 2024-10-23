import { createAlarm, usingAlarm, updateAlarm, deleteAlarm } from '../controllers/alarm.controller.js';
import { loginUser } from '../controllers/user.controller.js';
import { newSubscriber } from '../notifications/alarm.notifications.js';
import logger from '../config/logger.js';

function alarmRoutes(fastify, options) {

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
    
    // Route to register the email of the registered user
    fastify.post('/alarms/register-permission', async (request, reply) => {
        try {
            await newSubscriber(loginUser.email);
            reply.send({ success: true, message: 'User registered for notifications.' });
        } catch (error) {
            logger.error(error);
            reply.status(500).send({ error: 'Error registering user', message: error.message });
        }
    });
}

export default alarmRoutes;
