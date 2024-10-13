import { createAlarm, usingAlarm, updateAlarm, deleteAlarm } from '../controllers/alarm.controller.js';
import { alarmNotification } from '../notifications/alarm.notifications.js';

async function alarmRoutes(fastify, options){

    fastify.post('/alarms', async (request, reply) => {
        try{
            const { newAlarm, response} = await createAlarm(request, reply);
            if (response) {
            await alarmNotification(response.recipientId, response.title, response.body);
            }
        
        reply.send(newAlarm);
    
        } catch (error) {
            console.error(error);
            reply.status(500).send({ error: 'Error processing request', details: error.message });
        }
    });

    fastify.put('/alarms/:id', async (request, reply) => {
        try {
            const alarmId = parseInt(request.params.id, 10);
            if (isNaN(alarmId)) {
              return reply.status(400).send({ error: 'Invalid alarm ID' });
            }
            const alarm = await updateAlarm(request,reply);

            if (alarm.executed === true){
                const message = await usingAlarm(request,reply);
                await alarmNotification(message.recipientId, message.title, message.body);
            }
        } catch (error) {
            console.error(error);
            reply.status(500).send({ error: 'Error processing request', details: error.message });
        }
    });

    fastify.delete('/alarms/:id', async (request,reply) => {
        try {
            const alarmId = parseInt(request.params.id, 10);
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