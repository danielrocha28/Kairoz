import Alarm from '../model/alarm.model.js';
import { loginUser } from './user.controller.js';
import alarmSchema from '../validators/alarm.schema.js';
import User from '../model/user.model.js';
import { alarmNotification } from '../notifications/alarm.notifications.js';
import cron from 'node-cron';
import logger from '../config/logger.js';

class AlarmId {
  constructor() {
    this.id = null;
  }
}

const getAlarm = new AlarmId;

// Function to get the current date and start counting if it matches the defined one
function alarmCount(setDay, setTime) {
  const date = new Date();
  const day = date.getDay();
  const options = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];

  if (options[day] === setDay) {
     // Using cron to make requests every minute in real time 
    cron.schedule('* * * * *', () => {
      const hours = String(date.getHours()).padStart(2, '0'); 
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      const time = `${hours}:${minutes}:${seconds}`;

        // If the time matches the current time, send a notification
        if (setTime === time) {
          return time;
        }
      });
  }
}

export async function createAlarm(request, reply) {
  try {
    const validatedData = alarmSchema.parse(request.body);
    // Transforming into an array to send to the database
    const dayArray = validatedData.alarm_day.split(',').map(day => day.trim());
    validatedData.alarm_day = dayArray;
    const user = await User.findOne({ where: { email: loginUser.email } });

    if (!user) {
      return reply.status(404).send('User not found.');
    }
    const newAlarm = await Alarm.create(validatedData, validatedData.id_user = user.id_user);
    getAlarm.id = newAlarm.id_alarm;
    const statusAlarm = await Alarm.findOne({ where: { executed: true, id_alarm: newAlarm.id_alarm } });

    if (statusAlarm) {
      await usingAlarm(request, reply);
    }
    return reply.status(200).send(newAlarm);

  } catch (error) {
    logger.error(error);
    return reply.status(500).send({ error: 'Error creating the alarm.', message: error.message });
  }
}

// Function if the alarm is activated
export async function usingAlarm(request, reply) {
  try {
    const alarm = await Alarm.findOne({
      where: { executed: true, id_alarm: request.params.id_alarm || getAlarm.id },
    });

    if (!alarm) {
      return reply.status(404).send('Alarm not found');
    }
    // Transforming into a string when retrieved from the database
    const dayString = alarm.alarm_day.join(',');
    alarm.alarm_day = dayString;
    const { time } = alarmCount(alarm.alarm_day, alarm.alarm_time);

    if (time){
        await alarmNotification(alarm.id_user, time, alarm.message);
    }

  } catch (error) {
    logger.error(error);
    return reply.status(500).send({ error: 'Error manipulating the alarm.', message: error.message });
  }
}

export async function updateAlarm(request, reply) {
  try {
    const validatedData = alarmSchema.parse(request.body);

    // Checks if alarm_day is a string and transforms into an array
    if (typeof validatedData.alarm_day === 'string') {
      validatedData.alarm_day = validatedData.alarm_day.split(',').map(day => day.trim());
    };

    const [updated] = await Alarm.update(validatedData, {
      where: { id_alarm: request.params.id_alarm },
    });

    if (updated) {
      const updatedAlarm = await Alarm.findByPk(request.params.id_alarm);
      return updatedAlarm;
    } else {
      return reply.status(404).send({ error: `Alarm with id_alarm ${request.params.id_alarm} not found` });
    }
  } catch (error) {
    logger.error(error);
    return reply.status(500).send({ error: 'Error manipulating the alarm.', message: error.message });
  }
}

export async function deleteAlarm(request, reply) {
  try {
    const alarm = await Alarm.findOne({ where: { id_alarm: request.params.id_alarm } });

    if (!alarm) {
      return reply.status(404).send('Alarm not found');
    }

    const deleted = await Alarm.destroy({ where: { id_alarm: alarm.id_alarm } });

    if (deleted) {
      return reply.status(200).send('Alarm deleted');
    }
  } catch (error) {
    logger.error(error);
    return reply.status(500).send({ error: 'Error deleting the alarm.', message: error.message });
  }
}