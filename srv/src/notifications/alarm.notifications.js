import { Novu } from '@novu/node';
import dotenv from 'dotenv';

dotenv.config();

const novu = new Novu(process.env.NOVU_KEY) || 'http://localhost:3000';

export async function alarmNotification(recipientId, title, body){
try {

    const notification = await novu.notification.create({
      to: {
        subscriberId: recipientId,
      },
      content: {
        title: title,
        body: body,
      },
      type: 'push',
    });
    console.log('Notificação enviada:', notification);
    return reply.status(201).send(notification);
    
} catch (error) {
    console.error(error);
    return reply.status(500).send({ error: 'erro.', message: error.message,});
}
}