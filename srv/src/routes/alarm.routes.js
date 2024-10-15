import { createAlarm, usingAlarm, updateAlarm, deleteAlarm } from '../controllers/alarm.controller.js';
import { alarmNotification } from '../notifications/alarm.notifications.js';

async function alarmRoutes(fastify, options){

    fastify.post('/alarms', async (request, reply) => {
        try{
            const alarm = await createAlarm(request, reply);
            if(alarm){
            reply.send(alarm);
            }
        } catch (error) {
            console.error(error);
            reply.status(500).send({ error: 'Error processing request', details: error.message });
        }
    });

    fastify.put('/alarms/:id_alarm', async (request, reply) => {
        try {
            const alarmId = parseInt(request.params.id_alarm, 10);
            if (isNaN(alarmId)) {
              return reply.status(400).send({ error: 'Invalid alarm ID' });
            }
            const alarm = await updateAlarm(request,reply);

            if (alarm.executed === true){
                await usingAlarm(request,reply);
            }
        } catch (error) {
            console.error(error);
            reply.status(500).send({ error: 'Error processing request', details: error.message });
        }
    });

    fastify.delete('/alarms/:id_alarm', async (request,reply) => {
        try {
            const alarmId = parseInt(request.params.id_alarm, 10);
            if (isNaN(alarmId)) {
              return reply.status(400).send({ error: 'Invalid alarm ID' });
            }
            await deleteAlarm(request,reply);
        } catch (error) {
            console.error(error);
            reply.status(500).send({ error: 'Error processing request', details: error.message });
        }
    });
}

export default alarmRoutes;