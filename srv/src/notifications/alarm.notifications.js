import { Novu } from '@novu/node';
import dotenv from 'dotenv';

dotenv.config();

const novu = new Novu(process.env.NOVU_KEY, {
  applicationIdentifier: process.env.NOVU_APP_ID,
  environmentIdentifier: process.env.NOVU_ENV_ID,
});

export async function newSubscriber(id, email) {
  try {
    const subscriber = await novu.subscribers.create({
      subscriberId: id || email,
      email: email,
    });
    console.log('Subscriber created:', subscriber);
    return subscriber;
  } catch (error) {
    console.error('Error creating subscriber:', error);
    return {
      error: 'Error creating subscriber.',
      message: error.message,
    };
  }
}

export async function alarmNotification(recipientId, title, body) {
  try {
    const notification = await novu.notifications.create({
      to: {
        subscriberId: recipientId,
      },
      content: {
        title: title || 'Alarm',
        body: body  || `It's time not to procastinate`
      },
      type: 'push',
    });

    console.log('Notification sent:', notification);
    return notification;
  } catch (error) {
    console.error(error);
    return {
      error: 'Error creating notification.',
      message: error.message,
    }; // Retorna um objeto de erro
  }
}