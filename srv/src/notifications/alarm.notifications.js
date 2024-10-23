import { Novu } from '@novu/node';
import dotenv from 'dotenv';
import logger from '../config/logger.js';

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
    logger.info('Subscriber created:', subscriber);
    return subscriber;
  } catch (error) {
    logger.error('Error creating subscriber:', error);
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
        body: body  || 'It\'s time not to procastinate'
      },
      type: 'push',
    });

    logger.info('Notification sent:', notification);
    return notification;
  } catch (error) {
    logger.error(error);
    return {
      error: 'Error creating notification.',
      message: error.message,
    }; // Retorna um objeto de erro
  }
}